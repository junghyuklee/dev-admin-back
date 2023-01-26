import { IsOptional, IsString } from 'class-validator';

export class DefaultUpdateDto {
  @IsOptional()
  @IsString()
  readonly update_user_id?: string;
}
