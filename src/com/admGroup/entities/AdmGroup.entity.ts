import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('adm_group')
export class AdmGroup extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  group_key?: string;

  @Column({ type: 'varchar', length: 10, comment: '구분코드' })
  internal_div_cd?: string;

  @Column({ type: 'varchar', length: 100, comment: '그룹 아이디' })
  group_id?: string;

  @Column({ type: 'varchar', length: 100, comment: '그룹 명' })
  group_name?: string;

  @Column({ type: 'varchar', length: 2000, comment: '그룹 설명' })
  group_desc!: string;

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
