import { DefaultCreateDto } from './../../default/dto/DefaultCreate.dto';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class AdmGroupMemberDto extends DefaultCreateDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly parent_key?: string;

  @IsNotEmpty()
  @MaxLength(100)
  readonly child_key?: string;

  @IsNotEmpty()
  @MaxLength(10)
  readonly child_internal_div_cd?: string;
}
