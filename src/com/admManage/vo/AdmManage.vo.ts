import { DefaultVo } from '../../default/vo/Default.vo';
export interface AdmManageVo extends DefaultVo {
  readonly user_key?: string;
  readonly user_id?: string;
  readonly user_password?: string;
  readonly user_login_fail_cnt?: number;
  readonly user_admin_flag?: string;
  readonly group_name_list?: string[];
  readonly child_key?: string;
  readonly child_id?: string;
  readonly child_name?: string;
  readonly child_internal_div_cd?: string;
  readonly child_internal_div_nm?: string;
  readonly child_desc?: string;
}
