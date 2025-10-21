import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAdminDto {
  @ApiPropertyOptional({
    description: 'Nombre completo del administrador, máximo 200 caracteres.',
    example: 'Juan Pérez',
    minLength: 1,
    maxLength: 200,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto.' })
  @Length(1, 200, { message: 'El nombre debe tener entre 1 y 200 caracteres.' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Nombre de usuario único, máximo 100 caracteres.',
    example: 'jperez',
    minLength: 1,
    maxLength: 100,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser un texto.' })
  @Length(1, 100, { message: 'El nombre de usuario debe tener entre 1 y 100 caracteres.' })
  username?: string;

  @ApiPropertyOptional({
    description: 'Contraseña del administrador, máximo 200 caracteres.',
    example: 'MiContraseñaSegura123!',
    minLength: 6,
    maxLength: 200,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'La contraseña debe ser un texto.' })
  @Length(6, 200, { message: 'La contraseña debe tener entre 6 y 200 caracteres.' })
  password?: string;

  @ApiPropertyOptional({
    description: 'Departamento asignado al administrador, máximo 50 caracteres.',
    example: 'Recursos Humanos',
    minLength: 1,
    maxLength: 50,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El departamento asignado debe ser un texto.' })
  @Length(1, 50, { message: 'El departamento asignado debe tener entre 1 y 50 caracteres.' })
  assignedDepartment?: string;
}
