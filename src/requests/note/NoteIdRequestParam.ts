import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class NoteIdRequestParam {
  @IsNumber()
  @IsNotEmpty()
  @Transform((param) => Number(param.value))
  id: number;
}
