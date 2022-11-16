import { IsNotEmpty, MaxLength } from 'class-validator';

export class AdmFileAuthDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly file_key?: string;

  @IsNotEmpty()
  @MaxLength(100)
  readonly auth_key?: string;

  @IsNotEmpty()
  @MaxLength(10)
  readonly file_internal_div_cd?: string;

  @IsNotEmpty()
  @MaxLength(10)
  readonly auth_internal_div_cd?: string;
}
