import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AdmFileAuthRepository } from './AdmFileAuth.repository';
import { AdmFileAuthDto } from './dto/AdmFileAuth.dto';
import { AdmFileAuthVo } from './vo/AdmFileAuth.vo';

@Injectable()
export class AdmFileAuthService {
  constructor(private admFileAuthRepository: AdmFileAuthRepository) {}
  /**
   * file_key & auth_key 체크용 단일 조회
   * @param file_key, auth_key
   * @returns file_key, auth_key
   */
  async getOneFileAuthCheck(
    file_key: string,
    auth_key: string,
  ): Promise<AdmFileAuthVo | undefined> {
    return await this.admFileAuthRepository.getOneFileAuthCheck(
      file_key,
      auth_key,
    );
  }

  /**
   * 권한 멤버 추가
   * @param fileAuthDataList
   * @returns Boolean
   */
  async addFileAuth(fileAuthDataList: AdmFileAuthDto[]) {
    for (let fileAuthData of fileAuthDataList) {
      if (fileAuthData && fileAuthData.file_key && fileAuthData.auth_key) {
        if (
          !(await this.getOneFileAuthCheck(
            fileAuthData.file_key,
            fileAuthData.auth_key,
          ))
        ) {
          await this.admFileAuthRepository.addFileAuth(fileAuthData);
        }
      } else {
        const error = {
          message: '이미 권한이 있는 사용자 또는 그룹 입니다.',
        };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return;
  }

  /**
   * 권한 멤버 제거
   * @param fileAuthDataList
   * @returns Boolean
   */
  async deleteFileAuth(fileAuthDataList: AdmFileAuthDto[]) {
    for (let fileAuthData of fileAuthDataList) {
      if (fileAuthData && fileAuthData.file_key && fileAuthData.auth_key) {
        if (
          await this.getOneFileAuthCheck(
            fileAuthData.file_key,
            fileAuthData.auth_key,
          )
        ) {
          await this.admFileAuthRepository.deleteFileAuth(fileAuthData);
        }
      } else {
        const error = { message: '권한이 없는 사용자 또는 그룹 입니다.' };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return;
  }
}
