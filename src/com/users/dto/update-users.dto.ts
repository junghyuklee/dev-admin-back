import {
  IsNotEmpty,
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

export class UpdateUsersDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly user_nm: string;

  @IsOptional()
  @IsString()
  readonly use_yn: string;

  @IsOptional()
  @IsString()
  readonly admin_flag: string;
}
