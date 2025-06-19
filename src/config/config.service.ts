import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AppConfigService {
    private readonly _db: DbConfig;
    private readonly _mqtt: MqttConfig;
    private readonly _firebase: FirebaseConfig;
    private readonly _app:AppConfig;
    private readonly _email:EmailConfig;
    constructor(private readonly configService: ConfigService<EnvConfig>) {
        this._db = {
            type: this.configService.get('DB_TYPE') as string,
            host: this.configService.get('DB_HOST') as string,
            port:this.configService.get('DB_PORT') as number,
            username:this.configService.get('DB_USER') as string,
            paswword:this.configService.get('DB_PASSWORD') as string,
            database:this.configService.get('DB_NAME') as string,
            ssl:this.configService.get('DB_SSL') as boolean
        };
        this._mqtt = {
            broker: this.configService.get('BROKER_URL') as string,
            port:this.configService.get('BROKER_PORT') as number,
            username:this.configService.get('USERNAME_BROKER') as string,
            password:this.configService.get('PASSWORD_BROKER') as string
        }
        this._firebase = {
            project_id: this.configService.get('FIREBASE_PROJECT_ID') as string,
            client_email: this.configService.get('FIREBASE_CLIENT_EMAIL') as string,
            private_key: this.configService.get('FIREBASE_PRIVATE_KEY') as string
        }
        this._app ={
            port:this.configService.get('PORT') as number,
            node_env:this.configService.get('NODE_ENV') as string,
        }
        this._email ={
            email_user:this.configService.get('EMAIL_USER') as string,
            email_password:this.configService.get('EMAIL_PASSWORD') as string,
        }
    }
    get config() {
        return {
          db: this._db,
          mqtt:this._mqtt,
          firebase:this._firebase,
          app:this._app,
          email:this._email
        };
      }
    
}
