import { AdmGroupMemberVo } from './vo/AdmGroupMember.vo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmGroupMemberDto } from './dto/AdmGroupMember.dto';
import { AdmGroupMember } from './entities/AdmGroupMember.entity';

@Injectable()
export class AdmGroupMemberRepository {
  constructor(
    @InjectRepository(AdmGroupMember)
    private admGroupMemberRepository: Repository<AdmGroupMember>,
  ) {}
  /**
   * parent_key & child_key 체크용 단일 조회
   * @param parent_key, child_key
   * @returns parent_key, child_key
   */
  async getOneGroupMemberCheck(
    parent_key: string,
    child_key: string,
  ): Promise<AdmGroupMemberVo | undefined> {
    return await this.admGroupMemberRepository
      .createQueryBuilder()
      .select(['parent_key', 'child_key'])
      .where('parent_key = :parent_key', { parent_key: `${parent_key}` })
      .andWhere('child_key = :child_key', { child_key: `${child_key}` })
      .getRawOne();
  }

  /**
   * 그룹 멤버 추가
   * @param groupMemberDataList
   * @returns Boolean
   */
  async addGroupMember(groupMemberData: AdmGroupMemberDto) {
    /* Type-ORM 기본제공 save */
    return await this.admGroupMemberRepository.save(groupMemberData);
  }

  /**
   * 그룹 멤버 제거
   * @param groupMemberDataList
   * @returns Boolean
   */
  async deleteGroupMember(groupMemberData: AdmGroupMemberDto) {
    /* Type-ORM 기본제공 delete */
    return await this.admGroupMemberRepository.delete(groupMemberData);
  }
}
