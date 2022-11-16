import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AdmFileAuthService } from './AdmFileAuth.service';
import { AdmFileAuthDto } from './dto/AdmFileAuth.dto';

@Controller('fileAuth')
export class AdmFileAuthController {
  constructor(readonly admFileAuthService: AdmFileAuthService) {}
  // @UseGuards(JwtAuthGuard)
  @Post('/createFileAuth')
  createFileAuth(@Body() fileAuthDataList: AdmFileAuthDto[]) {
    return this.admFileAuthService.createFileAuth(fileAuthDataList);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/deleteFileAuth')
  deleteFileAuth(@Body() fileAuthDataList: AdmFileAuthDto[]) {
    return this.admFileAuthService.deleteFileAuth(fileAuthDataList);
  }
}
