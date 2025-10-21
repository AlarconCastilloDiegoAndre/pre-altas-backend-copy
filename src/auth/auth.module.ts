import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Student } from '../students/entities/student.entity';
import { Admin } from '../admins/entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from './constants/jwt.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Career } from '../careers/entities/career.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Admin, Career]),
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
