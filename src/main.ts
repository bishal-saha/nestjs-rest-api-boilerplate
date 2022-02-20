import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpStatus, INestApplication, UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import swaggerConfig from "@src/config/swagger.config";
import { HttpExceptionFilter } from "@src/filters/http-exception.filter";
import { HttpResponseInterceptor } from '@src/interceptors/http-response.interceptor';
import { TimeoutInterceptor } from '@src/interceptors/timeout.interceptor';

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
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      dismissDefaultMessages: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalFilters(new HttpExceptionFilter(reflector));
  app.useGlobalInterceptors(
    new HttpResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  if (configService.get<boolean>('app.enableDocumentation')) {
    swaggerConfig(app);
  }

  await app.listen(port);

  return app;
}
void bootstrap();
