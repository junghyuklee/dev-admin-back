import { DefaultVo } from './../../default/vo/Default.vo';
export interface AdmUserVo extends DefaultVo {
  readonly user_key?: string;
  readonly inter_div_cd?: string;
  readonly user_id?: string;
  readonly user_password_chg_date?: Date;
  readonly user_name?: string;
  readonly user_login_fail_cnt?: number;
  readonly user_admin_flag?: string;
  readonly user_desc?: string;
}
