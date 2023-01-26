import { DefaultCreateDto } from './../../default/dto/DefaultCreate.dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class AdmFileCreateDto extends DefaultCreateDto {
  @IsOptional()
  @MaxLength(100)
  readonly file_key?: string;

  @IsNotEmpty()
  @MaxLength(10)
  readonly internal_div_cd?: string;

  @IsNotEmpty()
  @Matches(/^[a-z0-9_-]*$/)
  @MaxLength(100)
  readonly file_id?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly file_name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly file_sequence?: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  readonly file_desc?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1)
  readonly use_yn?: string;

  @IsNotEmpty()
  readonly parent_file_key?: string;
}
