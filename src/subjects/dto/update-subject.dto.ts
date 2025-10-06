import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjectDto {
  @ApiProperty({
    description: 'Nombre de la materia, entre 3 y 30 caracteres.',
    example: 'Matemáticas',
    minLength: 3,
    maxLength: 30,
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre de la materia debe ser un texto' })
  @Length(3, 100, {
    message: 'El nombre de la materia debe tener entre 3 y 100 caracteres',
  })
  name?: string;
}
