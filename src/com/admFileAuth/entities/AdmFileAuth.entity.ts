import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('adm_file_auth')
export class AdmFileAuth extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 100, comment: 'fileKey' })
  file_key?: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 100,
    comment: '권한을 가진 id 또는 group Key',
  })
  auth_key?: string;

  @Column({ type: 'varchar', length: 10, comment: '폴더/파일 구분코드' })
  file_internal_div_cd?: string;

  @Column({ type: 'varchar', length: 10, comment: '권한 사용자/그룹 구분코드' })
  auth_internal_div_cd?: string;

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
