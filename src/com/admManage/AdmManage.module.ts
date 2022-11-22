import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmUser } from './../admUser/entities/AdmUser.entity';
import { AdmGroup } from './../admGroup/entities/AdmGroup.entity';
import { AdmFile } from './../admFile/entities/AdmFile.entity';
import { AdmManageController } from './AdmManage.controller';
import { AdmManageService } from './AdmManage.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdmUser, AdmGroup, AdmFile])],
  controllers: [AdmManageController],
  providers: [AdmManageService],
  exports: [AdmManageService],
})
export class AdmManageModule {}
