import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassWordService } from '../passWord/passWord.service';
import { AdmGroup } from './entities/AdmGroup.entity';
import { AdmGroupController } from './AdmGroup.controller';
import { AdmGroupService } from './AdmGroup.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdmGroup])],
  controllers: [AdmGroupController],
  providers: [AdmGroupService, PassWordService],
})
export class AdmUserModule {}
