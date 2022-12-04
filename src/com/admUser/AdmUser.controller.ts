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
import { AdmUserDto } from './dto/AdmUser.dto';

@Controller('user')
export class AdmUserController {
  constructor(readonly admUserService: AdmUserService) {}

  @Get('/selectUser')
  @UseGuards(AuthGuard)
  selectUser(
    @Query('user_key') user_key: string,
  ): Promise<AdmUserDto | undefined> {
    return this.admUserService.selectUser(user_key);
  }

  @Post('/createUser')
  @UseGuards(AuthGuard)
  createUser(@Body() userData: AdmUserDto) {
    return this.admUserService.createUser(userData);
  }

  @Patch('/updateUser')
  @UseGuards(AuthGuard)
  updateUser(@Body() userData: AdmUserDto) {
    return this.admUserService.updateUser(userData);
  }
}
