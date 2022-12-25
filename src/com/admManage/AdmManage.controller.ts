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
    @Query('group_idnm') group_idnm: string,
  ): Promise<AdmManageDto[]> {
    return this.admManageService.searchUserGroups(user_key, group_idnm);
  }

  @Get('/searchNoneUserGroups')
  @UseGuards(AuthGuard)
  searchNoneUserGroups(
    @Query('user_key') user_key: string,
    @Query('group_idnm') group_idnm: string,
  ): Promise<AdmManageDto[]> {
    return this.admManageService.searchNoneUserGroups(user_key, group_idnm);
  }

  @Get('/searchGroupMembers')
  @UseGuards(AuthGuard)
  searchGroupMembers(
    @Query('group_key') group_key: string,
    @Query('member_idnm') member_idnm: string,
  ): Promise<AdmManageDto[]> {
    return this.admManageService.searchGroupMembers(group_key, member_idnm);
  }

  @Get('/searchNoneGroupMembers')
  @UseGuards(AuthGuard)
  searchNoneGroupChildren(
    @Query('group_key') group_key: string,
    @Query('member_idnm') member_idnm: string,
  ): Promise<AdmManageDto[]> {
    return this.admManageService.searchNoneGroupMembers(group_key, member_idnm);
  }

  @Get('/searchFileAuth')
  @UseGuards(AuthGuard)
  searchFileAuths(@Query('file_id') file_id: string): Promise<AdmManageDto[]> {
    return this.admManageService.searchFileAuths(file_id);
  }
}
