import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ example: 'jperez', description: 'Usuario del admin' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'MiContraseñaSegura123!',
    description: 'Contraseña proporcionada por el administrador',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}