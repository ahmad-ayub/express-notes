import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoteRequest {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  type?: string;
}
