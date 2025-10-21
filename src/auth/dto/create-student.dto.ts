import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Número de matrícula o ID del estudiante',
    example: 202312345,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  studentId: number;

  @ApiProperty({
    description: 'Nombre completo del estudiante',
    example: 'Juan Pérez',
    minLength: 2,
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del estudiante',
    example: 'estudiante@uaq.mx',
    maxLength: 150,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @ApiProperty({
    description: 'Contraseña del estudiante hasheada',
    example: 'ASFKLJAHFLKSA897Y431248ASDJKASDH',
    minLength: 8,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(200)
  password: string;

  @ApiProperty({
    description: 'Número de grupo al que pertenece el estudiante',
    example: 32,
    minimum: 1,
    maximum: 255,
  })
  @IsInt()
  @Min(1)
  @Max(255)
  groupNo: number;

  @ApiProperty({
    description: 'Semestre actual del estudiante',
    example: 3,
    minimum: 1,
    maximum: 9,
  })
  @IsInt()
  @Min(1)
  @Max(9)
  semester: number;

  @ApiProperty({
    description: 'ID de la carrera asociada al estudiante',
    example: 'SOF18',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  career_id: string;
}