import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdmGroupMemberService } from './AdmGroupMember.service';
import { AdmGroupMemberDto } from './dto/AdmGroupMember.dto';

@Controller('groupMember')
export class AdmGroupMemberController {
  constructor(readonly admGroupMemberService: AdmGroupMemberService) {}

  @Post('/addGroupMember')
  @UseGuards(AuthGuard)
  addGroupMember(@Body() groupMemberDataList: AdmGroupMemberDto[]) {
    return this.admGroupMemberService.addGroupMember(groupMemberDataList);
  }

  @Post('/deleteGroupMember')
  @UseGuards(AuthGuard)
  deleteGroupMember(@Body() groupMemberDataList: AdmGroupMemberDto[]) {
    return this.admGroupMemberService.deleteGroupMember(groupMemberDataList);
  }
}
