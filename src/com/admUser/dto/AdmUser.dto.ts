import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  Matches,
  IsNumber,
  IsOptional,
} from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check';

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: false, //소문자 포함 강제
  mustContainNumber: false, //숫자 포함 강제
  mustContainSpecialCharacter: true, //특수기호 포함 강제
  mustContainUpperLetter: true, //대문자 포함 강제
};

export class AdmUserDto {
  @IsOptional()
  @MaxLength(100)
  readonly user_key?: string;

  @IsOptional()
  @MaxLength(10)
  internal_div_cd?: string;

  @IsNotEmpty()
  @Matches(/^[a-z0-9_-]*$/)
  @MaxLength(100)
  readonly user_id?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Validate(PasswordValidation, [passwordRequirement])
  user_password?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly user_name?: string;

  @IsOptional()
  @IsNumber()
  readonly user_login_fail_cnt?: number;

  @IsNotEmpty()
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
