import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AdmFileRepository } from './AdmFile.repository';
import { AdmFileDto } from './dto/AdmFile.dto';
import { AdmFile } from './entities/AdmFile.entity';

@Injectable()
export class AdmFileService {
  constructor(private admFileRepository: AdmFileRepository) {}
  /**
   * file_key 체크용 단일 조회
   * @param file_key
   * @returns file_id
   */
  async getOneFileKeyCheck(file_key: string): Promise<AdmFile | undefined> {
    return await this.admFileRepository.getOneFileKeyCheck(file_key);
  }

  /**
   * file_id 중복 체크용 단일 조회
   * @param file_id
   * @returns file_key
   */
  async getOneFileIdCheck(file_id: string): Promise<AdmFile | undefined> {
    return await this.getOneFileIdCheck(file_id);
  }

  /**
   * file_info 단일 조회(Detail 화면)
   * @param file_key
   * @returns file_info
   */
  async selectFile(file_key: string): Promise<AdmFile | undefined> {
    return await this.admFileRepository.selectFile(file_key);
  }

  /**
   * 파일 테이블 file_id or file_name like 검색
   * @param file_idnm
   * @returns 파일 정보(복수)
   */
  async searchFiles(file_idnm: string): Promise<AdmFile[]> {
    return await this.admFileRepository.searchFiles(file_idnm);
  }

  /**
   * 파일 또는 폴더 생성
   * @param fileData
   * @returns Boolean
   */
  async createFile(fileData: AdmFileDto) {
    if (fileData && fileData.file_key) {
      if (await this.getOneFileKeyCheck(fileData.file_key)) {
        return await this.admFileRepository.createFile(fileData);
      }
    } else {
      const error = { message: '이미 사용중인 아이디 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 파일 또는 폴더 정보 수정
   * @param fileData
   * @returns Boolean
   */
  async updateFile(fileData: AdmFileDto) {
    if (fileData && fileData.file_key) {
      if (await this.getOneFileKeyCheck(fileData.file_key)) {
        return await this.admFileRepository.updateFile(fileData);
      }
    } else {
      const error = { message: '등록되지 않은 파일 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
