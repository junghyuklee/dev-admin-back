import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmFileDto } from './dto/AdmFile.dto';
import { AdmFile } from './entities/AdmFile.entity';

@Injectable()
export class AdmFileService {
  constructor(
    @InjectRepository(AdmFile)
    private admFileRepository: Repository<AdmFile>,
  ) {}
  /**
   * file_key 체크용 단일 조회
   * @param file_key
   * @returns file_id
   */
  async getOneFileKeyCheck(file_key?: string): Promise<AdmFile | undefined> {
    return await this.admFileRepository
      .createQueryBuilder()
      .select(['file_id'])
      .where('file_key = :file_key', { file_key: `${file_key}` })
      .getRawOne();
  }

  /**
   * file_id 중복 체크용 단일 조회
   * @param file_id
   * @returns file_key
   */
  async getOneFileIdCheck(file_id?: string): Promise<AdmFile | undefined> {
    return await this.admFileRepository
      .createQueryBuilder()
      .select(['file_key'])
      .where('file_id = :file_id', { file_id: `${file_id}` })
      .getRawOne();
  }

  /**
   * 파일 테이블 file_id or file_name like 검색
   * @param file_idnm
   * @returns 파일 정보(복수)
   */
  async searchFiles(file_idnm: string): Promise<AdmFile[]> {
    file_idnm === undefined || file_idnm === null
      ? (file_idnm = '')
      : file_idnm;
    return await this.admFileRepository
      .createQueryBuilder()
      .select([
        'file_key',
        'file_id',
        'file_name',
        'CASE WHEN internal_div_cd = "FI" THEN "FILE" ELSE "FOLDER" END AS "internal_div_cd"',
        'file_sequence',
        'file_desc',
        'use_yn',
        'DATE_FORMAT(created_at,"%Y-%m-%d") AS "created_date"',
        'create_user_id',
        'DATE_FORMAT(updated_at,"%Y-%m-%d") AS "updated_date"',
        'update_user_id',
      ])
      .where('file_id like :file_id', { file_id: `%${file_idnm}%` })
      .orWhere('file_name like :file_name', { file_name: `%${file_idnm}%` })
      .addOrderBy('file_id', 'ASC')
      .getRawMany();
  }

  /**
   * 파일 또는 폴더 생성
   * @param fileData
   * @returns Boolean
   */
  async createFile(fileData: AdmFileDto) {
    if (!(await this.getOneFileIdCheck(fileData.file_id))) {
      return await this.admFileRepository.save(fileData);
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
    const updateFileKey = await this.getOneFileIdCheck(fileData.file_id);
    if (updateFileKey) {
      return await this.admFileRepository.update(
        {
          file_key: updateFileKey.file_key,
        },
        fileData,
      );
    } else {
      const error = { message: '등록되지 않은 파일 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
