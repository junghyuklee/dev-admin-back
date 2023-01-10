import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class AdmFileUpdateDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly file_key?: string;

  @IsOptional()
  @MaxLength(10)
  readonly internal_div_cd?: string;

  @IsOptional()
  @Matches(/^[a-z0-9_-]*$/)
  @MaxLength(100)
  readonly file_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly file_name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly file_sequence!: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  readonly file_desc!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  readonly use_yn?: string;

  @IsNotEmpty()
  readonly parent_file_key?: string;
}
