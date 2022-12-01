import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdmGroupMemberService } from './AdmGroupMember.service';
import { AdmGroupMemberDto } from './dto/AdmGroupMember.dto';

@Controller('groupMember')
export class AdmGroupMemberController {
  constructor(readonly admGroupMemberService: AdmGroupMemberService) {}

  @Post('/createGroupMember')
  @UseGuards(AuthGuard)
  createGroupMember(@Body() groupMemberDataList: AdmGroupMemberDto[]) {
    return this.admGroupMemberService.createGroupMember(groupMemberDataList);
  }

  @Delete('/deleteGroupMember')
  @UseGuards(AuthGuard)
  deleteGroupMember(@Body() groupMemberDataList: AdmGroupMemberDto[]) {
    return this.admGroupMemberService.deleteGroupMember(groupMemberDataList);
  }
}
