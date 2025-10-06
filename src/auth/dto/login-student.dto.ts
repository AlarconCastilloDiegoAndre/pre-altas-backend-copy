import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginStudentDto{
  @ApiProperty({ example: 202312345, description: 'ID único del estudiante (expediente)' })
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 'ASFKLJAHFLKSA897Y431248ASDJKASDH', description: 'Contraseña del estudiante' })
  @IsString()
  @IsNotEmpty()
  password: string;
}