import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
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

export class UpdateAdmUserDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  user_password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly user_name: string;

  @IsOptional()
  @IsString()
  readonly user_admin_flag: string;

  @IsOptional()
  @IsString()
  readonly use_yn: string;
}
