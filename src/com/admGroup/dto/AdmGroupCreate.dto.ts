import { DefaultCreateDto } from './../../default/dto/DefaultCreate.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class AdmGroupCreateDto extends DefaultCreateDto {
  @IsOptional()
  @MaxLength(100)
  readonly group_key?: string;

  @IsNotEmpty()
  @MaxLength(10)
  readonly internal_div_cd?: string;

  @IsNotEmpty()
  @MaxLength(100)
  readonly group_id?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly group_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  readonly group_desc!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1)
  readonly use_yn?: string;
}
