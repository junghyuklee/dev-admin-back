import { DefaultVo } from './../../default/vo/Default.vo';
export interface AdmFileAuthVo extends DefaultVo {
  readonly file_key?: string;
  readonly auth_key?: string;
  readonly auth_internal_div_cd?: string;
  readonly auth_id?: string;
  readonly auth_name?: string;
  readonly auth_desc?: string;
}
