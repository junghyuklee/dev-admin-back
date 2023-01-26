import { AdmUserVo } from './vo/AdmUser.vo';
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
import { AdmUserService } from './AdmUser.service';
import { AdmUserCreateDto } from './dto/AdmUserCreate.dto';
import { AdmUserUpdateDto } from './dto/AdmUserUpdate.dto';
import { AdmUserUpdatePasswordDto } from './dto/AdmUserUpdatePassword.dto';
import { AdmUser } from './entities/AdmUser.entity';

@Controller('user')
export class AdmUserController {
  constructor(readonly admUserService: AdmUserService) {}

  @Get('/selectUser')
  @UseGuards(AuthGuard)
  selectUser(
    @Query('user_key') user_key: string,
  ): Promise<AdmUserVo | undefined> {
    return this.admUserService.selectUser(user_key);
  }

  @Post('/createUser')
  @UseGuards(AuthGuard)
  createUser(@Body() userData: AdmUserCreateDto) {
    return this.admUserService.createUser(userData);
  }

  @Patch('/updateUser')
  @UseGuards(AuthGuard)
  updateUser(@Body() userData: AdmUserUpdateDto) {
    return this.admUserService.updateUser(userData);
  }

  @Patch('/updateUserPassword')
  @UseGuards(AuthGuard)
  updateUserPassword(@Body() userData: AdmUserUpdatePasswordDto) {
    return this.admUserService.updateUserPassword(userData);
  }

  @Patch('/deleteUser')
  @UseGuards(AuthGuard)
  deleteUser(@Body() userKeyList: any[]) {
    return this.admUserService.deleteUser(userKeyList);
  }
}
