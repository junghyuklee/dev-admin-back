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
import { AdmGroupDto } from './dto/AdmGroup.dto';
import { AdmGroup } from './entities/AdmGroup.entity';
import { AdmGroupService } from './AdmGroup.service';

@Controller('group')
export class AdmGroupController {
  constructor(readonly admGroupService: AdmGroupService) {}

  @Get('/searchGroups')
  @UseGuards(AuthGuard)
  searchGroups(@Query('user_idnm') user_idnm: string): Promise<AdmGroup[]> {
    return this.admGroupService.searchGroups(user_idnm);
  }

  @Post('/createGroup')
  @UseGuards(AuthGuard)
  createGroup(@Body() groupData: AdmGroupDto) {
    return this.admGroupService.createGroup(groupData);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('/updateGroup')
  updateGroup(@Body() groupData: AdmGroupDto) {
    return this.admGroupService.updateGroup(groupData);
  }
}
