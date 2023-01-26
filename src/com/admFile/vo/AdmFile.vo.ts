import { DefaultVo } from './../../default/vo/Default.vo';
export interface AdmFileVo extends DefaultVo {
  readonly file_key?: string;
  readonly internal_div_cd?: string;
  readonly file_id?: string;
  readonly file_name?: string;
  readonly file_sequence?: string;
  readonly file_desc?: string;
}
