import { DefaultUpdateDto } from './../../default/dto/DefaultUpdate.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class AdmGroupUpdateDto extends DefaultUpdateDto {
  @IsNotEmpty()
  @MaxLength(100)
  readonly group_key?: string;

  @IsOptional()
  @MaxLength(10)
  readonly internal_div_cd?: string;

  @IsOptional()
  @MaxLength(100)
  readonly group_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly group_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  readonly group_desc!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1)
  readonly use_yn?: string;
}
