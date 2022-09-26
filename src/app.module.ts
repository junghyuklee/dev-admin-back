import { AuthModule } from './com/auth/auth.module';
import { UsersModule } from './com/users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { PassWordModule } from './com/pass-word/pass-word.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
    AuthModule,
    PassWordModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
