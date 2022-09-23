import { UsersModule } from './com/users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
