import { AdmUserDto } from 'src/com/admUser/dto/AdmUser.dto';

export class AdmManageDto extends AdmUserDto {
  readonly group_key?: string;
  readonly group_id?: string;
  readonly group_name?: string;
  readonly group_key_list?: string[];
  readonly parent_key?: string;
  readonly parent_id?: string;
  readonly parent_name?: string;
  readonly child_key?: string;
  readonly child_id?: string;
  readonly child_name?: string;
  readonly child_internal_div_cd?: string;
}
