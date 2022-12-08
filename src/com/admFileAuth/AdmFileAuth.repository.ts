import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdmFileAuth } from './entities/AdmFileAuth.entity';

@Injectable()
export class AdmFileAuthRepository extends Repository<AdmFileAuth> {
  /**
   * file_key & auth_key 체크용 단일 조회
   * @param file_key, auth_key
   * @returns file_key, auth_key
   */
  async getOneFileAuthCheck(
    file_key: string,
    auth_key: string,
  ): Promise<AdmFileAuth | undefined> {
    return await this.createQueryBuilder()
      .select(['file_key', 'auth_key'])
      .where('file_key = :file_key', { file_key: `${file_key}` })
      .andWhere('auth_key = :auth_key', { auth_key: `${auth_key}` })
      .getRawOne();
  }
}
