import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateCareerSubjectDto {
  @ApiProperty({
    description: 'ID de la carrera asociada.',
    example: 'SOFT18',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El id de la carrera es requerido.' })
  careerId: string;

  @ApiProperty({
    description: 'ID de la materia asociada.',
    example: 2005,
    type: Number,
    required: true,
  })
  @IsNotEmpty({ message: 'El id de la materia es requerido.' })
  @IsInt({ message: 'El id de la materia debe ser un número entero.' })
  @Min(1, { message: 'El número mínimo es 1' })
  @Max(32767, { message: 'El número máximo es 32767' })
  subjectId: number;

  @ApiProperty({
    description:
      'Semestre en el que se imparte la materia dentro de la carrera (entre 1 y 9).',
    example: 2,
    type: Number,
    required: true,
    minimum: 1,
    maximum: 9,
  })
  @IsNotEmpty({ message: 'El semestre es requerido.' })
  @IsInt({ message: 'El semestre debe ser un número entero.' })
  @Min(1, { message: 'El semestre debe ser mayor o igual a 1.' })
  @Max(9, { message: 'El semestre debe ser menor o igual a 9.' })
  semester: number;
}
