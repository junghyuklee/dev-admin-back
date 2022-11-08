import { AuthModule } from './com/auth/auth.module';
import { AdmUserModule } from './com/user/AdmUser.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { PassWordModule } from './com/passWord/passWord.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AdmUserModule,
    AuthModule,
    PassWordModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
