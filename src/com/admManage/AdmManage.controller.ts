import { AdmGroupVo } from './../admGroup/vo/AdmGroup.vo';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdmFileAuthVo } from './../admFileAuth/vo/AdmFileAuth.vo';
import { AdmManageService } from './AdmManage.service';
import { AdmManageVo } from './vo/AdmManage.vo';

@Controller('manage')
export class AdmManageController {
  constructor(readonly admManageService: AdmManageService) {}

  @Get('/searchUsers')
  @UseGuards(AuthGuard)
  searchUsers(@Query('user_idnm') user_idnm: string): Promise<AdmManageVo[]> {
    return this.admManageService.searchUsers(user_idnm);
  }

  @Get('/searchUserGroups')
  @UseGuards(AuthGuard)
  searchUserGroups(
    @Query('user_key') user_key: string,
    @Query('group_idnm') group_idnm: string,
  ): Promise<AdmGroupVo[]> {
    return this.admManageService.searchUserGroups(user_key, group_idnm);
  }

  @Get('/searchNoneUserGroups')
  @UseGuards(AuthGuard)
  searchNoneUserGroups(
    @Query('user_key') user_key: string,
    @Query('group_idnm') group_idnm: string,
  ): Promise<AdmGroupVo[]> {
    return this.admManageService.searchNoneUserGroups(user_key, group_idnm);
  }

  @Get('/searchGroupMembers')
  @UseGuards(AuthGuard)
  searchGroupMembers(
    @Query('group_key') group_key: string,
    @Query('member_idnm') member_idnm: string,
  ): Promise<AdmManageVo[]> {
    return this.admManageService.searchGroupMembers(group_key, member_idnm);
  }

  @Get('/searchNoneGroupMembers')
  @UseGuards(AuthGuard)
  searchNoneGroupChildren(
    @Query('group_key') group_key: string,
    @Query('member_idnm') member_idnm: string,
  ): Promise<AdmManageVo[]> {
    return this.admManageService.searchNoneGroupMembers(group_key, member_idnm);
  }

  @Get('/searchFileAuths')
  @UseGuards(AuthGuard)
  searchFileAuths(
    @Query('file_key') file_key: string,
    @Query('idnm') idnm: string,
  ): Promise<AdmFileAuthVo[]> {
    return this.admManageService.searchFileAuths(file_key, idnm);
  }
}
