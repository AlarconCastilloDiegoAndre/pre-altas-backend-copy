import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from './constants/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    JwtModule.register({
      secret: JWT_KEY, // Clave secreta para firmar el token
      signOptions: { expiresIn: EXPIRES_IN }, // Opciones de firma del token
      global: true, // Hacer el módulo global para que esté disponible en toda la aplicación
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
