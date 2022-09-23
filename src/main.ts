import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// SSL 적용 시
// async function bootstrap() {
//   const fs = require('fs');
//   const httpsOptions = {
//     key: fs.readFileSync('./secrets/private-key.pem'),
//     cert: fs.readFileSync('./secrets/public-certificate.pem'),
//   };
//   const app = await NestFactory.create(AppModule, {
//     httpsOptions,
//   });
//   await app.listen(443);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(8080);
}
bootstrap();
