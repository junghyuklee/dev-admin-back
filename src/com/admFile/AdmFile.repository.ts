import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmFileDto } from './dto/AdmFile.dto';
import { AdmFile } from './entities/AdmFile.entity';

@Injectable()
export class AdmFileRepository {
  constructor(
    @InjectRepository(AdmFile)
    private admFileRepository: Repository<AdmFile>,
  ) {}
  /**
   * file_key 체크용 단일 조회
   * @param file_key
   * @returns file_id
   */
  async getOneFileKeyCheck(file_key: string): Promise<AdmFile | undefined> {
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
  async getOneFileIdCheck(file_id: string): Promise<AdmFile | undefined> {
    return await this.admFileRepository
      .createQueryBuilder()
      .select(['file_key'])
      .where('file_id = :file_id', { file_id: `${file_id}` })
      .getRawOne();
  }

  /**
   * file_info 단일 조회
   * @param file_key
   * @returns file_info
   */
  async selectFile(file_key: string): Promise<AdmFile | undefined> {
    return await this.admFileRepository
      .createQueryBuilder()
      .select(['file_key', 'file_id', 'file_name', 'file_desc', 'use_yn'])
      .where('file_key = :file_key', { file_key: `${file_key}` })
      .getRawOne();
  }

  /**
   * 파일 테이블 file_id or file_name like 검색
   * @param file_idnm
   * @returns 파일 정보(복수)
   */
  async searchFiles(file_idnm: string): Promise<AdmFile[]> {
    // return await this.admFileRepository
    //   .createQueryBuilder()
    //   .select([
    //     'file_key',
    //     'file_id',
    //     'file_name',
    //     'CASE WHEN internal_div_cd = "FI" THEN "FILE" ELSE "FOLDER" END AS "internal_div_cd"',
    //     'file_sequence',
    //     'file_desc',
    //     'use_yn',
    //     'DATE_FORMAT(created_at,"%Y-%m-%d") AS "created_date"',
    //     'create_user_id',
    //     'DATE_FORMAT(updated_at,"%Y-%m-%d") AS "updated_date"',
    //     'update_user_id',
    //   ])
    //   .where('file_id like :file_id', { file_id: `%${file_idnm}%` })
    //   .orWhere('file_name like :file_name', { file_name: `%${file_idnm}%` })
    //   .addOrderBy('file_id', 'ASC')
    //   .getRawMany();
    return await this.admFileRepository.find();
  }

  /**
   * 파일 또는 폴더 생성
   * @param fileData
   * @returns Boolean
   */
  async createFile(fileData: AdmFileDto) {
    /* Type-ORM 기본제공 save */
    return await this.admFileRepository.save(fileData);
  }

  /**
   * 파일 또는 폴더 정보 수정
   * @param fileData
   * @returns Boolean
   */
  async updateFile(fileData: AdmFileDto) {
    /* Type-ORM 기본제공 update */
    return await this.admFileRepository.update(
      {
        file_key: fileData.file_key,
      },
      fileData,
    );
  }
}
