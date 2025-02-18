import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { CustomLog } from './custom-log.entity';
import { LoggerService } from './logger.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([CustomLog]),
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
