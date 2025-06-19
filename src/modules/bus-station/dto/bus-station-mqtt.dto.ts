import { ApiProperty } from '@nestjs/swagger';

export class MqttCommand {

    @ApiProperty({ example: 1, description: 'id del usuario que envia el comando' })
    user_id: number;

    @ApiProperty({ example: "jhon", description: 'nombre del usuario que envio el comando' })
    name: string;

    @ApiProperty({ example: "doe", description: 'apellido del usuario que envio el comando' })
    lastname: string;

    @ApiProperty({ example: "jhondoe@example.com", description: 'correo de la persona que envio' })
    email: string;


    @ApiProperty({ example: "warning_sound", description: 'comando' })
    command: string;
    
    @ApiProperty({ example: "audio", description: 'si va afectar al mecanismo o al audio' })
    path: string;

    @ApiProperty({ example: "jhondoe", description: 'usuario que realiza la peticion' })
    username: string;

    @ApiProperty({ example: "desarrollo/commands", description: 'topico de la solicitud' })
    topic: string;

}