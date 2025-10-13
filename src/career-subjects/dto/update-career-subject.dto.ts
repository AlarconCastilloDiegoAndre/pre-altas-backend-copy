import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class UpdateCareerSubjectDto {
  @ApiPropertyOptional({
    description: 'ID de la carrera asociada.',
    example: 'SOFT18',
    type: String,
  })
  @IsOptional()
  careerId?: string;

  @ApiPropertyOptional({
    description: 'ID de la materia asociada.',
    example: 2005,
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'El id de la materia debe ser un número entero.' })
  subjectId?: number;

  @ApiPropertyOptional({
    description: 'Semestre en el que se imparte la materia dentro de la carrera (entre 1 y 9).',
    example: 2,
    type: Number,
    minimum: 1,
    maximum: 9,
  })
  @IsOptional()
  @IsInt({ message: 'El semestre debe ser un número entero.' })
  @Min(1, { message: 'El semestre debe ser mayor o igual a 1.' })
  @Max(9, { message: 'El semestre debe ser menor o igual a 9.' })
  semester?: number;
}