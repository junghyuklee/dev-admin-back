import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdmGroupDto } from './dto/AdmGroup.dto';
import { AdmGroup } from './entities/AdmGroup.entity';
import { AdmGroupService } from './AdmGroup.service';

@Controller('group')
export class AdmGroupController {
  constructor(readonly admGroupService: AdmGroupService) {}

  @Get('/selectGroup')
  @UseGuards(AuthGuard)
  selectGroup(
    @Query('group_key') group_key: string,
  ): Promise<AdmGroupDto | undefined> {
    return this.admGroupService.selectGroup(group_key);
  }

  @Get('/searchGroups')
  @UseGuards(AuthGuard)
  searchGroups(@Query('group_idnm') group_idnm: string): Promise<AdmGroup[]> {
    return this.admGroupService.searchGroups(group_idnm);
  }

  @Post('/createGroup')
  @UseGuards(AuthGuard)
  createGroup(@Body() groupData: AdmGroupDto) {
    return this.admGroupService.createGroup(groupData);
  }

  @Patch('/updateGroup')
  @UseGuards(AuthGuard)
  updateGroup(@Body() groupData: AdmGroupDto) {
    return this.admGroupService.updateGroup(groupData);
  }
}
