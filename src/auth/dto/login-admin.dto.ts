import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ example: 'Juanito123', description: 'Usuario del admin' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 12345678,
    description: 'Contraseña proporcionada por el administrador',
  })
  password: string;
}