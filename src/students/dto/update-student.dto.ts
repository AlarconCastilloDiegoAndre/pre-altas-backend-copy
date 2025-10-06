import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateStudentDto {
  @ApiPropertyOptional({
    description: 'Nombre completo del estudiante',
    example: 'Juan Pérez',
    minLength: 2,
    maxLength: 150,
  })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del estudiante',
    example: 'estudiante@universidad.edu',
    maxLength: 150,
  })
  @IsEmail()
  @IsOptional()
  @MaxLength(150)
  email?: string;

  @ApiPropertyOptional({
    description: 'Contraseña del estudiante',
    example: 'MiC0ntr4$eña',
    minLength: 8,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(200)
  password?: string;

  @ApiPropertyOptional({
    description: 'Número de grupo al que pertenece el estudiante',
    example: 101,
    minimum: 1,
    maximum: 255,
  })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(255)
  groupNo?: number;

  @ApiPropertyOptional({
    description: 'Semestre actual del estudiante',
    example: 3,
    minimum: 1,
    maximum: 12,
  })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(12)
  semester?: number;

  @ApiPropertyOptional({
    description: 'Plan de estudios al que pertenece el estudiante',
    example: 'Ingeniería en Sistemas',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  plan?: string;
}