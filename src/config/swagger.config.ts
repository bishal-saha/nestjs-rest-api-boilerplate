import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const title = 'NestJS REST Api Boilerplate';
const description = 'Rest API Description';
const version = '1.0.0';

const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: title,
    customCss: `
      .swagger-ui .topbar {
        display: none;
      }
    `,
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);
};

export default swaggerConfig;
