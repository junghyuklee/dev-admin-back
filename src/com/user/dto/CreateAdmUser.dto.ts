import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  Matches,
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

export class CreateAdmUserDto {
  @IsNotEmpty()
  @Matches(/^[a-z0-9]*$/)
  @MaxLength(20)
  readonly user_id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  user_password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly user_name: string;

  @IsNotEmpty()
  @IsString()
  readonly user_admin_flag: string;

  @IsNotEmpty()
  @IsString()
  readonly use_yn: string;
}
