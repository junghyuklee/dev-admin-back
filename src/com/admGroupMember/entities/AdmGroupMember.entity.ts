import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('adm_group_member')
export class AdmGroupMember extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 100, comment: '부모Key' })
  parent_key?: string;

  @PrimaryColumn({ type: 'varchar', length: 100, comment: '자식Key' })
  child_key?: string;

  @Column({ type: 'varchar', length: 10, comment: '자식구분코드' })
  child_internal_div_cd?: string;

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
