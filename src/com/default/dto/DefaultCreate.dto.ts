import { IsOptional, IsString } from 'class-validator';

export class DefaultCreateDto {
  @IsOptional()
  @IsString()
  readonly create_user_id?: string;
}
