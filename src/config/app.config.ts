import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  appPort: parseInt(process.env.APP_PORT),
  appName: process.env.APP_NAME,
  appPrefix: process.env.APP_PREFIX,
  enableDocumentation: Boolean(process.env.ENABLE_DOCUMENTATION),
}));
