import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdmGroupService } from './AdmGroup.service';
import { AdmGroupCreateDto } from './dto/AdmGroupCreate.dto';
import { AdmGroupUpdateDto } from './dto/AdmGroupUpdate.dto';
import { AdmGroupVo } from './vo/AdmGroup.vo';

@Controller('group')
export class AdmGroupController {
  constructor(readonly admGroupService: AdmGroupService) {}

  @Get('/selectGroup')
  @UseGuards(AuthGuard)
  selectGroup(
    @Query('group_key') group_key: string,
  ): Promise<AdmGroupVo | undefined> {
    return this.admGroupService.selectGroup(group_key);
  }

  @Get('/searchGroups')
  @UseGuards(AuthGuard)
  searchGroups(@Query('group_idnm') group_idnm: string): Promise<AdmGroupVo[]> {
    return this.admGroupService.searchGroups(group_idnm);
  }

  @Post('/createGroup')
  @UseGuards(AuthGuard)
  createGroup(@Body() groupData: AdmGroupCreateDto) {
    return this.admGroupService.createGroup(groupData);
  }

  @Patch('/updateGroup')
  @UseGuards(AuthGuard)
  updateGroup(@Body() groupData: AdmGroupUpdateDto) {
    return this.admGroupService.updateGroup(groupData);
  }

  @Patch('/deleteGroup')
  @UseGuards(AuthGuard)
  deleteGroup(@Body() groupKeyList: any[]) {
    return this.admGroupService.deleteGroup(groupKeyList);
  }
}
