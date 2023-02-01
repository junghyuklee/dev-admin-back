import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { AdmFileAuthService } from './AdmFileAuth.service';
import { AdmFileAuthDto } from './dto/AdmFileAuth.dto';

@Controller('fileAuth')
export class AdmFileAuthController {
  constructor(readonly admFileAuthService: AdmFileAuthService) {}
  @Post('/addFileAuth')
  @UseGuards(AuthGuard)
  addGroupMember(@Body() fileAuthDataList: AdmFileAuthDto[]) {
    return this.admFileAuthService.addFileAuth(fileAuthDataList);
  }

  @Post('/deleteFileAuth')
  @UseGuards(AuthGuard)
  deleteFileAuth(@Body() fileAuthDataList: AdmFileAuthDto[]) {
    return this.admFileAuthService.deleteFileAuth(fileAuthDataList);
  }
}
