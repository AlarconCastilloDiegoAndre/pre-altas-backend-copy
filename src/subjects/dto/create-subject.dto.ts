import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
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
  @Min(1, { message: 'El número mínimo es 1' })
  @Max(32767, { message: 'El número máximo es 32767' })
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
  @Length(3, 100, {
    message: 'El nombre de la materia debe tener entre 3 y 100 caracteres',
  })
  name: string;
}
