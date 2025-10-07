import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Nombre completo del administrador, máximo 200 caracteres.',
    example: 'Juan Pérez',
    minLength: 1,
    maxLength: 200,
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @IsString({ message: 'El nombre debe ser un texto.' })
  @Length(1, 200, { message: 'El nombre debe tener entre 1 y 200 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'Nombre de usuario único, máximo 100 caracteres.',
    example: 'jperez',
    minLength: 1,
    maxLength: 100,
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido.' })
  @IsString({ message: 'El nombre de usuario debe ser un texto.' })
  @Length(1, 100, { message: 'El nombre de usuario debe tener entre 1 y 100 caracteres.' })
  username: string;

  @ApiProperty({
    description: 'Contraseña del administrador, máximo 200 caracteres.',
    example: 'MiContraseñaSegura123!',
    minLength: 6,
    maxLength: 200,
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'La contraseña es requerida.' })
  @IsString({ message: 'La contraseña debe ser un texto.' })
  @Length(6, 200, { message: 'La contraseña debe tener entre 6 y 200 caracteres.' })
  password: string;

  @ApiProperty({
    description: 'Carrera asignada al administrador, máximo 50 caracteres.',
    example: 'Ingenieria de software',
    minLength: 1,
    maxLength: 50,
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'La carrera asignada es requerida.' })
  @IsString({ message: 'La carrera asignada debe ser un texto.' })
  @Length(1, 50, { message: 'La carrera asignada debe tener entre 1 y 50 caracteres.' })
  assignedDepartment: string;
}
