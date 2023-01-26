import { DefaultVo } from '../../default/vo/Default.vo';
export interface AdmGroupMemberVo extends DefaultVo {
  readonly parent_key?: string;
  readonly child_key?: string;
  readonly child_internal_div_cd?: string;
}
