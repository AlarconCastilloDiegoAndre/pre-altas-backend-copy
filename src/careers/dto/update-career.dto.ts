import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCareerDto {
  @ApiProperty({
    description: 'Nombre de la carrera, entre 3 y 50 caracteres.',
    example: 'Ingeniería en Sistemas',
    minLength: 3,
    maxLength: 50,
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre de la carrera debe ser un texto' })
  @Length(3, 50, {
    message: 'El nombre de la carrera debe tener entre 3 y 50 caracteres',
  })
  name?: string;
}