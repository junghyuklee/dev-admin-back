import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

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
      whitelist: true, //validation을 위한 decorator가 붙어있지 않은 속성들은 제거
      forbidNonWhitelisted: true, //true 일 때, DTO에 정의되지 않은 프로퍼티 전달시 에러 발생
      transform: true, //컨트롤러에서 Typescript 로 정한 타입으로 파이프에서 변환되어 전달 받음.
    }),
  );

  app.use(cookieParser());

  await app.listen(8080);
}
bootstrap();
