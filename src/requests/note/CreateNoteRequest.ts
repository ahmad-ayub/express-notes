import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
