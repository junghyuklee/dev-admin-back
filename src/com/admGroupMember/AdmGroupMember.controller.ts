import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AdmGroupMemberService } from './AdmGroupMember.service';
import { AdmGroupMemberDto } from './dto/AdmGroupMember.dto';

@Controller('groupMember')
export class AdmGroupMemberController {
  constructor(readonly admGroupMemberService: AdmGroupMemberService) {}
  // @UseGuards(JwtAuthGuard)
  @Post('/createGroupMember')
  createGroupMember(@Body() groupMemberDataList: AdmGroupMemberDto[]) {
    return this.admGroupMemberService.createGroupMember(groupMemberDataList);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/deleteGroupMember')
  deleteGroupMember(@Body() groupMemberDataList: AdmGroupMemberDto[]) {
    return this.admGroupMemberService.deleteGroupMember(groupMemberDataList);
  }
}
