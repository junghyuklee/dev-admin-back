import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmUser } from './entities/AdmUser.entity';
import { AdmUserController } from './AdmUser.controller';
import { AdmUserService } from './AdmUser.service';
import { PassWordModule } from '../passWord/PassWord.module';
import { AdmUserRepository } from './AdmUser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdmUser]), PassWordModule],
  controllers: [AdmUserController],
  providers: [AdmUserService, AdmUserRepository],
  exports: [AdmUserService],
})
export class AdmUserModule {}
