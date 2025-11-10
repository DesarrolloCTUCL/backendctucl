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
import { MailsService } from 'src/shared/mails/mails.service';
import { AppLoggerService } from 'src/common/logger/app-logger.service';

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

		if (existingUser) {
			throw new HttpException(
				'User with this email or DNI already exists',
				HttpStatus.CONFLICT,
			);
		}

		// Generar contraseña aleatoria
		const password = Math.random().toString(36).slice(-8);
		const hashedPassword = await hash(
			password,
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
				role: AccountType.STAFF,
				gender: registerUserDto.gender,
				birthday: registerUserDto.birthday
			});

			savedUser = await this.userRepository.save(userEntity);
		} catch (error) {
			throw new InternalServerErrorException('Error creating user');
		}


		try {
			const mail = new WelcomeMailFromAdmin(
				savedUser.name,
				savedUser.email,
				password,
				'SIMTRA',
				'https://consorcioloja.com/_next/image?url=%2Fimg%2Flogo.png&w=256&q=75',
				'simtra-support',
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
