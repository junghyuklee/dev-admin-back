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
import { AdmFileService } from './AdmFile.service';
import { AdmFileCreateDto } from './dto/AdmFileCreate.dto';
import { AdmFileUpdateDto } from './dto/AdmFileUpdate.dto';
import { AdmFolder } from './interface/AdmFolder';
import { AdmFileVo } from './vo/AdmFile.vo';

@Controller('file')
export class AdmFileController {
  constructor(readonly admFileService: AdmFileService) {}

  @Get('/selectFile')
  @UseGuards(AuthGuard)
  selectFile(
    @Query('file_key') file_key: string,
  ): Promise<AdmFileVo | undefined> {
    return this.admFileService.selectFile(file_key);
  }

  @Get('/searchFolderTree')
  @UseGuards(AuthGuard)
  searchFolderTree(): Promise<AdmFolder[]> {
    return this.admFileService.searchFolderTree();
  }

  @Get('/searchFiles')
  @UseGuards(AuthGuard)
  searchFiles(
    @Query('file_key') file_key: string,
    @Query('file_idnm') file_idnm: string,
  ): Promise<AdmFileVo[]> {
    return this.admFileService.searchFiles(file_key, file_idnm);
  }

  @Post('/createFile')
  @UseGuards(AuthGuard)
  create(@Body() fileData: AdmFileCreateDto) {
    return this.admFileService.createFile(fileData);
  }

  @Patch('/updateFile')
  @UseGuards(AuthGuard)
  update(@Body() fileData: AdmFileUpdateDto) {
    return this.admFileService.updateFile(fileData);
  }

  @Patch('/deleteFile')
  @UseGuards(AuthGuard)
  deleteUser(@Body() fileKeyList: any[]) {
    return this.admFileService.deleteFile(fileKeyList);
  }
}
