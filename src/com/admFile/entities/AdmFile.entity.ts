import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('adm_file')
export class AdmFile extends BaseEntity {
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

  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
  })
  created_at?: Date;

  @Column({ type: 'varchar', length: 100, comment: '생성 아이디' })
  create_user_id?: string;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '수정일',
  })
  updated_at!: Date;

  @Column({ type: 'varchar', length: 100, comment: '수정 아이디' })
  update_user_id!: string;
}
