import { Controller, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { AdmManageDto } from './dto/AdmManage.dto';
import { AdmManageService } from './AdmManage.service';
import { AdmGroupMemberDto } from '../admGroupMember/dto/AdmGroupMember.dto';

@Controller('manage')
export class AdmManageController {
  constructor(readonly admManageService: AdmManageService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/searchUsers')
  searchUsers(@Query('user_idnm') user_idnm: string): Promise<AdmManageDto[]> {
    return this.admManageService.searchUsers(user_idnm);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/searchGroupMembers')
  searchGroupMembers(
    @Query('group_id') group_id: string,
  ): Promise<AdmManageDto[]> {
    return this.admManageService.searchGroupMembers(group_id);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/searchFileAuth')
  searchFileAuths(@Query('file_id') file_id: string): Promise<AdmManageDto[]> {
    console.log(file_id);
    return this.admManageService.searchFileAuths(file_id);
  }
}
