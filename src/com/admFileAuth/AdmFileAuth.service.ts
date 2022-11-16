import { AdmManageService } from '../admManage/AdmManage.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmFileAuthDto } from './dto/AdmFileAuth.dto';
import { AdmFileAuth } from './entities/AdmFileAuth.entity';

@Injectable()
export class AdmFileAuthService {
  constructor(
    @InjectRepository(AdmFileAuth)
    private admFileAuthRepository: Repository<AdmFileAuth>,
  ) {}
  /**
   * file_key & auth_key 체크용 단일 조회
   * @param file_key, auth_key
   * @returns file_key, auth_key
   */
  async getOneFileAuthCheck(
    file_key?: string,
    auth_key?: string,
  ): Promise<AdmFileAuth | undefined> {
    return await this.admFileAuthRepository
      .createQueryBuilder()
      .select(['file_key', 'auth_key'])
      .where('file_key = :file_key', { file_key: `${file_key}` })
      .andWhere('auth_key = :auth_key', { auth_key: `${auth_key}` })
      .getRawOne();
  }

  /**
   * 권한 멤버 추가
   * @param fileAuthDataList
   * @returns Boolean
   */
  async createFileAuth(fileAuthDataList: AdmFileAuthDto[]) {
    for (let fileAuthData of fileAuthDataList) {
      if (
        !(await this.getOneFileAuthCheck(
          fileAuthData.file_key,
          fileAuthData.auth_key,
        ))
      ) {
        await this.admFileAuthRepository.save(fileAuthData);
      } else {
        const error = {
          child_key: '이미 권한이 있는 사용자 또는 그룹 입니다.',
        };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  /**
   * 권한 멤버 제거
   * @param groupMemberData
   * @returns Boolean
   */
  async deleteFileAuth(fileAuthDataList: AdmFileAuthDto[]) {
    for (let fileAuthData of fileAuthDataList) {
      if (
        await this.getOneFileAuthCheck(
          fileAuthData.file_key,
          fileAuthData.auth_key,
        )
      ) {
        await this.admFileAuthRepository.delete({
          file_key: fileAuthData.file_key,
          auth_key: fileAuthData.auth_key,
        });
      } else {
        const error = { child_key: '권한이 없는 사용자 또는 그룹 입니다.' };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
