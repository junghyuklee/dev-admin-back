import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AdmFileCreateDto } from './dto/AdmFileCreate.dto';
import { AdmFileUpdateDto } from './dto/AdmFileUpdate.dto';
import { AdmFile } from './entities/AdmFile.entity';

@Injectable()
export class AdmFileRepository {
  constructor(
    @InjectRepository(AdmFile)
    private admFileRepository: Repository<AdmFile>,

    @InjectEntityManager()
    private readonly manager: EntityManager,
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
      .select([
        'file_key',
        'file_id',
        'internal_div_cd',
        'file_name',
        'file_sequence',
        'file_desc',
        'parent_file_key',
        'use_yn',
      ])
      .where('file_key = :file_key', { file_key: `${file_key}` })
      .getRawOne();
  }

  /**
   * 파일 테이블 폴더 Tree 검색
   * @returns 폴더 정보(복수)
   */
  async searchFolderTree(): Promise<AdmFile[]> {
    return await this.admFileRepository.query(
      `WITH RECURSIVE CTE(file_key, file_name, parent_file_key, file_sequence, level, path) AS (
        SELECT 
          file_key,
          file_name,
          parent_file_key,
          file_sequence,
          1 AS level,
          concat(file_sequence,file_name) as path
        FROM ADM_FILE
        WHERE file_key = 'Root'
        UNION ALL
        SELECT
          a.file_key,
          a.file_name,
          a.parent_file_key,
          a.file_sequence,
          1 + level AS level,
          CONCAT(b.path,a.file_sequence,a.file_name) as path
        FROM ADM_FILE a
        INNER JOIN CTE b ON a.parent_file_key = b.file_key	
        WHERE a.file_key != 'Root'
          AND a.use_yn = 'Y'
          AND a.internal_div_cd = 'FO'
      )
      SELECT 
        file_key, 
        file_name AS 'label',
        'folder' AS 'icon',
        parent_file_key,
        file_sequence,
        level,
        path
      FROM CTE
      order by path`,
    );
  }

  /**
   * 파일 테이블 file_id or file_name like 검색
   * @param fileSearchData
   * @returns 파일 정보(복수)
   */
  async searchFiles(file_key: string, file_idnm: string): Promise<AdmFile[]> {
    return await this.admFileRepository
      .createQueryBuilder()
      .select([
        'file_key',
        'internal_div_cd',
        'IF((internal_div_cd = "FO"), "folder", "description") AS "internal_div_icon"',
        'file_id',
        'file_name',
        'file_sequence',
        'file_desc',
        'use_yn',
        'DATE_FORMAT(created_at,"%Y-%m-%d") AS "created_date"',
        'create_user_id',
        'DATE_FORMAT(updated_at,"%Y-%m-%d") AS "updated_date"',
        'update_user_id',
      ])
      .where('parent_file_key = :file_key', {
        file_key: `${file_key}`,
      })
      .andWhere('(file_id like :file_idnm or file_name like :file_idnm)', {
        file_idnm: `%${file_idnm}%`,
      })
      .addOrderBy('internal_div_cd', 'ASC')
      .addOrderBy('file_sequence', 'ASC')
      .getRawMany();
  }

  /**
   * 파일 또는 폴더 생성
   * @param fileData
   * @returns Boolean
   */
  async createFile(fileData: AdmFileCreateDto) {
    /* Type-ORM 기본제공 save */
    return await this.admFileRepository.save(fileData);
  }

  /**
   * 파일 또는 폴더 정보 수정
   * @param fileData
   * @returns Boolean
   */
  async updateFile(fileData: AdmFileUpdateDto) {
    /* Type-ORM 기본제공 update */
    return await this.admFileRepository.update(
      {
        file_key: fileData.file_key,
      },
      fileData,
    );
  }
}
