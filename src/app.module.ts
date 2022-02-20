import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@src/config';
import { validate } from '@src/config/env.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: process.env.NODE_ENV === 'production',
      expandVariables: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      load: config,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
    I18nModule.forRootAsync({
      parser: I18nJsonParser,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('i18n'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
