import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  private defaultContext = 'AppLogger';

  constructor(context?: string) {
    super(context ?? 'AppLogger');
    if (context) this.defaultContext = context;
  }

  log(message: string, context?: string) {
    super.log(`[LOG] ${message}`, context || this.defaultContext);
  }

  error(message: string, stack?: string, context?: string) {
    super.error(`[ERROR] ${message}`, stack, context || this.defaultContext);
  }

  warn(message: string, context?: string) {
    super.warn(`[WARN] ${message}`, context || this.defaultContext);
  }

  debug(message: string, context?: string) {
    super.debug(`[DEBUG] ${message}`, context || this.defaultContext);
  }

  verbose(message: string, context?: string) {
    super.verbose(`[VERBOSE] ${message}`, context || this.defaultContext);
  }

  setLogLevelsByEnv(env: string) {
    if (env === 'production') {
      this.setLogLevels(['log', 'error']);
    } else {
      this.setLogLevels(['log', 'error', 'debug', 'verbose']);
    }
  }
}
