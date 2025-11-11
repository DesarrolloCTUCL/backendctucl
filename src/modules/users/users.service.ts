import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/database/entities/company.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { AppConfigService } from 'src/config/config.service';
import { AccountType } from 'src/common/enum/account-type.enum';
import { WelcomeMailFromAdmin } from 'src/shared/mails/templates/welcome-mail-from-admin';
import { WelcomeMailRegister } from 'src/shared/mails/templates/welcome-register';
import { MailsService } from 'src/shared/mails/mails.service';
import { AppLoggerService } from 'src/common/logger/app-logger.service';
import { Vehicle } from 'src/database/entities/vehicle.entity';

@Injectable()
export class UsersService {
	constructor(
		private appConfigService: AppConfigService,
		private mailsService: MailsService,
		private logger: AppLoggerService,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>,
		@InjectRepository(Vehicle)
		private readonly vehicleRepository: Repository<Vehicle>,
	) { }

	async registerUser(registerUserDto: RegisterUserDto) {
		// Validación temprana del DNI
		const trimmedDni = registerUserDto.dni.trim();
		if (trimmedDni.length < 10) {
			throw new BadRequestException('DNI must be at least 10 characters long');
		}

		// Verificar si el usuario ya existe
		const existingUser = await this.userRepository.findOne({
			where: [
				{ email: registerUserDto.email },
				{ dni: trimmedDni },
			],
		});

		let vehicle: Vehicle | null= null;
		if(registerUserDto.vehicle){
			const foundVehicle = await this.vehicleRepository.findOne({where:{register:registerUserDto.vehicle,status:true}})
			if (!foundVehicle) {
            	throw new NotFoundException(`Bank Account with ID ${registerUserDto.vehicle} not found`);
       	 	}
        	vehicle = foundVehicle;
		}

		if (existingUser) {
			throw new HttpException(
				'User with this email or DNI already exists',
				HttpStatus.CONFLICT,
			);
		}
		// verificar si existe la company

		const company =  await this.companyRepository.findOne({
			where:{id:registerUserDto.company_id}
		})

		if(!company){
			throw new NotFoundException(`company with id ${registerUserDto.company_id} does not exists`);
		}

		// Generar contraseña aleatoria

		const hashedPassword = await hash(
			registerUserDto.password,
			this.appConfigService.crypto.salt.size,
		);

		// Crear y guardar usuario
		let savedUser: User;
		try {
			const userEntity = this.userRepository.create({
				name: registerUserDto.name.toUpperCase(),
				lastname: registerUserDto.lastname.toUpperCase(),
				email: registerUserDto.email,
				dni: trimmedDni,
				phone: registerUserDto.phone,
				address: registerUserDto.address,
				password: hashedPassword,
				role: registerUserDto.role,
				gender: registerUserDto.gender,
				birthday: registerUserDto.birthday,
				company:company,
				profile:registerUserDto.profile
			});

			savedUser = await this.userRepository.save(userEntity);
			if(vehicle){
				vehicle.user = savedUser
				await this.vehicleRepository.save(vehicle)
				savedUser.shared_vehicles = [
					{
						id:vehicle.id,
						register:vehicle.register
					}
				]
				await this.userRepository.save(savedUser)
				return {
					result: savedUser,
					message: 'User created successfully , and added vehicle',
				};
			}

		} catch (error) {
			throw new InternalServerErrorException('Error creating user');
		}


		try {
			const mail = new WelcomeMailRegister(
				savedUser.name,
				savedUser.email,
				'SIMTRA',
				'https://consorcioloja.com/_next/image?url=%2Fimg%2Flogo.png&w=256&q=75',
			);

			await this.mailsService.sendMail({
				to: savedUser.email,
				subject: `${savedUser.name}, bienvenido a SIMTRA${process.env.NODE_ENV === 'production'
					? ''
					: ' - [ Ambiente de pruebas ]'
					}`,
				html: mail.getHtml(),
			});

			return {
				result: savedUser,
				message: 'User created successfully and sended mail',
			};
		} catch (emailError) {
			this.logger.warn(
				'Email could not be sent, but user was created',
				emailError instanceof Error ? emailError.message : JSON.stringify(emailError),
			);

			return {
				result: savedUser,
				message: 'User created successfully, but welcome email could not be sent',
			};
		}
	}




}
