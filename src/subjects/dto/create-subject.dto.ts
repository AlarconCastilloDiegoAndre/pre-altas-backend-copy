import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'ID único y positivo de la materia.',
    example: 1,
    minimum: 1,
    type: Number,
    required: true,
  })
  @IsNotEmpty({ message: 'El id de materia es un campo requerido' })
  @IsNumber({}, { message: 'El id de materia debe ser un número' })
  @IsPositive({ message: 'El id de materia debe ser un número positivo' })
  subjectId: number;

  @ApiProperty({
    description: 'Nombre de la materia, entre 3 y 30 caracteres.',
    example: 'Matemáticas',
    minLength: 3,
    maxLength: 30,
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre de la materia es un campo requerido' })
  @IsString({ message: 'El nombre de la materia debe ser un texto' })
  @Length(3, 30, { message: 'El nombre de la materia debe tener entre 3 y 30 caracteres' })
  name: string;
}