import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import swaggerConfig from '@src/config/swagger.config';

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // to make sure all logs will be buffered until a custom logger is attached
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.appPort');
  const apiPrefix = configService.get<string>('app.appPrefix');

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix(apiPrefix);

  if (configService.get<boolean>('app.enableDocumentation')) {
    swaggerConfig(app);
  }

  await app.listen(port);

  return app;
}
void bootstrap();
