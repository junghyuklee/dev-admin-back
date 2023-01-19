import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AdmFileRepository } from './AdmFile.repository';
import { AdmFileCreateDto } from './dto/AdmFileCreate.dto';
import { AdmFileUpdateDto } from './dto/AdmFileUpdate.dto';
import { AdmFile } from './entities/AdmFile.entity';

@Injectable()
export class AdmFileService {
  constructor(private admFileRepository: AdmFileRepository) {}
  /**
   * file_key 체크용 단일 조회
   * @param file_key
   * @returns file_id
   */
  async getOneFileKeyCheck(file_key: string): Promise<AdmFile | undefined> {
    return await this.admFileRepository.getOneFileKeyCheck(file_key);
  }

  /**
   * file_id 중복 체크용 단일 조회
   * @param file_id
   * @returns file_key
   */
  async getOneFileIdCheck(file_id: string): Promise<AdmFile | undefined> {
    return await this.admFileRepository.getOneFileIdCheck(file_id);
  }

  /**
   * file_info 단일 조회(Detail 화면)
   * @param file_key
   * @returns file_info
   */
  async selectFile(file_key: string): Promise<AdmFile | undefined> {
    return await this.admFileRepository.selectFile(file_key);
  }

  /**
   * 파일 테이블 폴더 Tree 검색
   * @returns 폴더 정보(복수)
   */
  async searchFolderTree(): Promise<any[]> {
    const result = await this.admFileRepository.searchFolderTree();
    return this.list_to_tree(result);
  }

  /**
   * 파일 테이블 file_id or file_name like 검색
   * @param file_key
   * @param file_idnm
   * @returns 파일 정보(복수)
   */
  async searchFiles(file_key: string, file_idnm: string): Promise<AdmFile[]> {
    if (file_key === undefined || file_key === '') {
      file_key = 'Root';
    }

    if (file_idnm === undefined || file_idnm === '') {
      file_idnm = '';
    }
    return await this.admFileRepository.searchFiles(file_key, file_idnm);
  }

  /**
   * 파일 또는 폴더 생성
   * @param fileData
   * @returns Boolean
   */
  async createFile(fileData: AdmFileCreateDto) {
    if (fileData && fileData.file_id) {
      if (!(await this.getOneFileIdCheck(fileData.file_id))) {
        return await this.admFileRepository.createFile(fileData);
      }
    } else {
      const errorNotify = { message: '이미 등록 되어있는 폴더/파일 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', errorNotify },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 파일 또는 폴더 정보 수정
   * @param fileData
   * @returns Boolean
   */
  async updateFile(fileData: AdmFileUpdateDto) {
    if (fileData && fileData.file_key) {
      if (await this.getOneFileKeyCheck(fileData.file_key)) {
        return await this.admFileRepository.updateFile(fileData);
      }
    } else {
      const error = { message: '등록되지 않은 파일 입니다.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 폴더 또는 파일 삭제
   * @param fileKeyList
   * @returns
   */
  async deleteFile(fileKeyList: any[]) {
    if (fileKeyList.length > 0) {
      for (const i in fileKeyList) {
        if (await this.getOneFileKeyCheck(fileKeyList[i].key)) {
          await this.admFileRepository.deleteFile(fileKeyList[i].key);
        } else {
          const error = { message: '등록되지 않은 폴더 또는 파일 입니다.' };
          throw new HttpException(
            { message: 'Input data validation failed', error },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      return 200;
    } else {
      const error = { message: '삭제하려는 폴더 또는 파일을 선택해주세요.' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async list_to_tree(list: any[]) {
    let map: any = {};
    let node;
    let roots = [];
    let i;
    for (i = 0; i < list.length; i += 1) {
      if (list[i].file_key) {
        map[list[i].file_key] = i; // initialize the map
        list[i].children = []; // initialize the children
      }
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent_file_key !== null) {
        // if you have dangling branches check that map[node.parentId] exists

        list[map[node.parent_file_key]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
}
