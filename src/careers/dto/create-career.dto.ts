import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCareerDto {
  @ApiProperty({
    description: 'ID único de la carrera, tipo cadena de texto de 5 caracteres.',
    example: 'SOFT18',
    minLength: 5,
    maxLength: 5,
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El id de carrera es un campo requerido' })
  @IsString({ message: 'El id de carrera debe ser un texto' })
  @Length(5, 5, {
    message: 'El id de carrera debe tener exactamente 5 caracteres',
  })
  careerId: string;

  @ApiProperty({
    description: 'Nombre de la carrera, entre 3 y 50 caracteres.',
    example: 'Ingeniería en Sistemas',
    minLength: 3,
    maxLength: 50,
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre de la carrera es un campo requerido' })
  @IsString({ message: 'El nombre de la carrera debe ser un texto' })
  @Length(3, 50, {
    message: 'El nombre de la carrera debe tener entre 3 y 50 caracteres',
  })
  name: string;
}