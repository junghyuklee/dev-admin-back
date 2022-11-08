import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassWordService } from '../passWord/PassWord.service';
import { AdmUser } from './entities/AdmUser.entity';
import { AdmUserController } from './AdmUser.controller';
import { AdmUserService } from './AdmUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdmUser])],
  controllers: [AdmUserController],
  providers: [AdmUserService, PassWordService],
})
export class AdmUserModule {}
