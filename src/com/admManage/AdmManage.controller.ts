import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdmManageService } from './AdmManage.service';
import { AdmManageDto } from './dto/AdmManage.dto';

@Controller('manage')
export class AdmManageController {
  constructor(readonly admManageService: AdmManageService) {}

  @Get('/searchUsers')
  @UseGuards(AuthGuard)
  searchUsers(@Query('user_idnm') user_idnm: string): Promise<AdmManageDto[]> {
    return this.admManageService.searchUsers(user_idnm);
  }

  @Get('/searchUserGroups')
  @UseGuards(AuthGuard)
  searchUserGroups(
    @Query('user_key') user_key: string,
  ): Promise<AdmManageDto[]> {
    return this.admManageService.searchUserGroups(user_key);
  }

  @Get('/searchGroupMembers')
  @UseGuards(AuthGuard)
  searchGroupMembers(
    @Query('group_id') group_id: string,
  ): Promise<AdmManageDto[]> {
    return this.admManageService.searchGroupMembers(group_id);
  }

  @Get('/searchFileAuth')
  @UseGuards(AuthGuard)
  searchFileAuths(@Query('file_id') file_id: string): Promise<AdmManageDto[]> {
    return this.admManageService.searchFileAuths(file_id);
  }
}
