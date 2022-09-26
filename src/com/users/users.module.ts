import { PassWordService } from '../pass-word/pass-word.service';
import { Users } from './entities/Users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, PassWordService],
})
export class UsersModule {}
