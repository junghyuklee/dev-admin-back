import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdmGroupMember } from './entities/AdmGroupMember.entity';

@Injectable()
export class AdmGroupMemberRepository extends Repository<AdmGroupMember> {
  /**
   * parent_key & child_key 체크용 단일 조회
   * @param parent_key, child_key
   * @returns parent_key, child_key
   */
  async getOneGroupMemberCheck(
    parent_key: string,
    child_key: string,
  ): Promise<AdmGroupMember | undefined> {
    return await this.createQueryBuilder()
      .select(['parent_key', 'child_key'])
      .where('parent_key = :parent_key', { parent_key: `${parent_key}` })
      .andWhere('child_key = :child_key', { child_key: `${child_key}` })
      .getRawOne();
  }
}
