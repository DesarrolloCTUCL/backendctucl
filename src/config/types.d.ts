

interface EnvConfig {

  DB_TYPE:string
  DB_HOST:string
  DB_PORT:string
  DB_USER:string
  DB_PASSWORD:string
  DB_NAME:string
  DB_SSL:number

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


interface AppConfig {
  port: number,
  node_env: string
}

interface EmailConfig {
  email_user: string,
  email_password: string
}