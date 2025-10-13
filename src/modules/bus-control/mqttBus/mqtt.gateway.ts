import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // ⚠️ Ajusta en producción
    },
  })
  export class MqttGateway implements OnGatewayInit {
    @WebSocketServer() server: Server;
  
    afterInit() {
      console.log('🚀 WebSocket Gateway inicializado');
    }
  
    emitNewPosition(position: any) {
      // Se puede emitir a todos o por room (por device_id)
      this.server.emit(`gps_update_${position.device_id}`, position);
    }
  }
  