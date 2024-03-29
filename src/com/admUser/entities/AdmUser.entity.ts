import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('adm_user')
export class AdmUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_key?: string;

  @Column({ type: 'varchar', length: 10, comment: '구분코드' })
  internal_div_cd?: string;

  @Column({ type: 'varchar', length: 100, comment: '사용자 아이디' })
  user_id?: string;

  @Column({ type: 'varchar', length: 100, comment: '비밀번호' })
  user_password?: string;

  @Column({ type: 'date', comment: '비밀번호 수정일' })
  user_password_chg_date?: Date;

  @Column({ type: 'varchar', length: 100, comment: '사용자 명' })
  user_name?: string;

  @Column({ type: 'int', comment: '로그인 실패 횟수' })
  user_login_fail_cnt?: number;

  @Column({ type: 'varchar', length: 10, comment: '관리자 Flag' })
  user_admin_flag?: string;

  @Column({ type: 'varchar', length: 2000, comment: '사용자 설명' })
  user_desc?: string;

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
  updated_at?: Date;

  @Column({ type: 'varchar', length: 100, comment: '수정 아이디' })
  update_user_id?: string;
}
