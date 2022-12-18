import {
  IsNotEmpty,
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
  mustContainLowerLetter: true, //소문자 포함 강제
  mustContainNumber: true, //숫자 포함 강제
  mustContainSpecialCharacter: true, //특수기호 포함 강제
  mustContainUpperLetter: true, //대문자 포함 강제
};

export class AdmUserUpdatePasswordDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly user_key?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Validate(PasswordValidation, [passwordRequirement])
  user_password?: string;

  user_password_chg_date?: Date;
}
