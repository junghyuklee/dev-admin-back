import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmFileAuthDto } from './dto/AdmFileAuth.dto';
import { AdmFileAuth } from './entities/AdmFileAuth.entity';

@Injectable()
export class AdmFileAuthRepository {
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
    file_key: string,
    auth_key: string,
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
   * @param fileAuthData
   * @returns Boolean
   */
  async createFileAuth(fileAuthData: AdmFileAuthDto) {
    /* Type-ORM 기본제공 save */
    return await this.admFileAuthRepository.save(fileAuthData);
  }

  /**
   * 권한 멤버 제거
   * @param fileAuthData
   * @returns Boolean
   */
  async deleteFileAuth(fileAuthData: AdmFileAuthDto) {
    /* Type-ORM 기본제공 delete */
    return await this.admFileAuthRepository.delete(fileAuthData);
  }
}
