import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmGroup } from './entities/AdmGroup.entity';
import { AdmGroupController } from './AdmGroup.controller';
import { AdmGroupService } from './AdmGroup.service';
import { AdmGroupRepository } from './AdmGroup.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdmGroup])],
  controllers: [AdmGroupController],
  providers: [AdmGroupService, AdmGroupRepository],
  exports: [AdmGroupService],
})
export class AdmGroupModule {}
