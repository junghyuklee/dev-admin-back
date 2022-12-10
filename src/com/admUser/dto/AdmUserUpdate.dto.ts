import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class AdmUserUpdateDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly user_key?: string;

  @IsOptional()
  @MaxLength(10)
  internal_div_cd?: string;

  @IsOptional()
  @Matches(/^[a-z0-9_-]*$/)
  @MaxLength(100)
  readonly user_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly user_name?: string;

  @IsOptional()
  @IsNumber()
  readonly user_login_fail_cnt?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  readonly user_admin_flag?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  readonly user_desc!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1)
  readonly use_yn?: string;
}
