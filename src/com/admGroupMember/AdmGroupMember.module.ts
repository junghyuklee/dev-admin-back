import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmGroupMember } from './entities/AdmGroupMember.entity';
import { AdmGroupMemberController } from './AdmGroupMember.controller';
import { AdmGroupMemberService } from './AdmGroupMember.service';
import { AdmGroupMemberRepository } from './AdmGroupMember.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdmGroupMember])],
  controllers: [AdmGroupMemberController],
  providers: [AdmGroupMemberService, AdmGroupMemberRepository],
  exports: [AdmGroupMemberService],
})
export class AdmGroupMemberModule {}
