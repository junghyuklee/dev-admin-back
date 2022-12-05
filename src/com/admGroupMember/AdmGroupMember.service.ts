import { AdmManageService } from './../admManage/AdmManage.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmGroupMemberDto } from './dto/AdmGroupMember.dto';
import { AdmGroupMember } from './entities/AdmGroupMember.entity';

@Injectable()
export class AdmGroupMemberService {
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
    parent_key?: string,
    child_key?: string,
  ): Promise<AdmGroupMember | undefined> {
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
  async createGroupMember(groupMemberDataList: AdmGroupMemberDto[]) {
    for (let groupMemberData of groupMemberDataList) {
      if (
        !(await this.getOneGroupMemberCheck(
          groupMemberData.parent_key,
          groupMemberData.child_key,
        ))
      ) {
        return await this.admGroupMemberRepository.save(groupMemberData);
      } else {
        const error = { message: '이미 등록 되어있는 멤버 입니다.' };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  /**
   * 그룹 멤버 제거
   * @param groupMemberDataList
   * @returns Boolean
   */
  async deleteGroupMember(groupMemberDataList: AdmGroupMemberDto[]) {
    for (let groupMemberData of groupMemberDataList) {
      if (
        await this.getOneGroupMemberCheck(
          groupMemberData.parent_key,
          groupMemberData.child_key,
        )
      ) {
        return await this.admGroupMemberRepository.delete({
          parent_key: groupMemberData.parent_key,
          child_key: groupMemberData.child_key,
        });
      } else {
        const error = { message: '등록되지 않은 멤버 입니다.' };
        throw new HttpException(
          { message: 'Input data validation failed', error },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
