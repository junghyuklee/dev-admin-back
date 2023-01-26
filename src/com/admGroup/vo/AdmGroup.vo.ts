import { DefaultVo } from './../../default/vo/Default.vo';
export interface AdmGroupVo extends DefaultVo {
  readonly group_key?: string;
  readonly inter_div_cd?: string;
  readonly group_id?: string;
  readonly group_name?: string;
  readonly grouop_desc?: string;
}
