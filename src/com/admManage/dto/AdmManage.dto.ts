import { AdmUserCreateDto } from 'src/com/admUser/dto/AdmUserCreate.dto';

export class AdmManageDto extends AdmUserCreateDto {
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
