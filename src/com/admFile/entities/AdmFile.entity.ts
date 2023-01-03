import { DefaultEntity } from 'src/com/default/entity/AdmFile.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('adm_file')
export class AdmFile extends DefaultEntity {
  @PrimaryGeneratedColumn('uuid')
  file_key?: string;

  @Column({ type: 'varchar', length: 10, comment: '구분코드' })
  internal_div_cd?: string;

  @Column({ type: 'varchar', length: 100, comment: '파일 아이디' })
  file_id?: string;

  @Column({ type: 'varchar', length: 100, comment: '파일 명' })
  file_name?: string;

  @Column({ type: 'int', comment: '파일 시퀀스' })
  file_sequence!: number;

  @Column({ type: 'varchar', length: 2000, comment: '파일 설명' })
  file_desc!: string;

  @Column({ type: 'varchar', length: 10, comment: '사용여부' })
  use_yn?: string;

  @Column({ type: 'varchar', length: 100, comment: '부모 Key' })
  parent_file_key?: string;
}
