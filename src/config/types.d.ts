

interface EnvConfig {

  DB_TYPE:string
  DB_HOST:string
  DB_PORT:string
  DB_USER:string
  DB_PASSWORD:string
  DB_NAME:string
  DB_SSL:number
  BROKER_URL: string
  BROKER_PORT: number
  USERNAME_BROKER: string
  PASSWORD_BROKER: string
  FIREBASE_PROJECT_ID: string
  FIREBASE_CLIENT_EMAIL: string
  FIREBASE_PRIVATE_KEY: string
  PORT: number
  NODE_ENV:string
  EMAIL_USER:string
  EMAIL_PASSWORD:string
}

interface DbConfig {
  type:string,
  host: string,
  port:number,
  username:string,
  paswword:string,
  database:string,
  ssl:boolean
}
interface MqttConfig {
  broker: string;
  port: number
  username: string
  password: string
}
interface FirebaseConfig {
  project_id: string,
  client_email: string,
  private_key: string
}
interface AppConfig {
  port: number,
  node_env: string
}

interface EmailConfig {
  email_user: string,
  email_password: string
}