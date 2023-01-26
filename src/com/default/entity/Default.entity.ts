import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DefaultEntity extends BaseEntity {
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
  updated_at?: Date;

  @Column({ type: 'varchar', length: 100, comment: '수정 아이디' })
  update_user_id?: string;
}
