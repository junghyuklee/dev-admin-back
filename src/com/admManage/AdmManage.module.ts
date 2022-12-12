import { AdmGroupMember } from './../admGroupMember/entities/AdmGroupMember.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmUser } from './../admUser/entities/AdmUser.entity';
import { AdmGroup } from './../admGroup/entities/AdmGroup.entity';
import { AdmFile } from './../admFile/entities/AdmFile.entity';
import { AdmManageController } from './AdmManage.controller';
import { AdmManageService } from './AdmManage.service';
import { AdmManageRepository } from './AdmManage.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdmUser, AdmGroup, AdmGroupMember, AdmFile]),
  ],
  controllers: [AdmManageController],
  providers: [AdmManageService, AdmManageRepository],
  exports: [AdmManageService],
})
export class AdmManageModule {}
