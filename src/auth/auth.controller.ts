import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginStudentDto } from './dto/login-student.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { TOKEN_NAME } from './constants/jwt.constants';
import express from 'express';
import { ApiCrudDocs } from '../docs/api-crud-docs.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('students-register')
  @ApiCrudDocs({
    summary: 'Registrar un nuevo estudiante',
    bodyType: CreateStudentDto,
    responses: [
      { status: 201, description: 'Estudiante registrado correctamente.' },
      { status: 400, description: 'Datos inválidos o estudiante ya existe.' },
    ],
  })
  async studentRegister(@Body() createStudentDto: CreateStudentDto) {
    return this.authService.studentRegister(createStudentDto);
  }

  @Post('students-login')
  @ApiCrudDocs({
    summary: 'Login de estudiantes',
    bodyType: LoginStudentDto,
    responses: [
      { status: 200, description: 'Login exitoso. Devuelve token JWT.' },
      { status: 401, description: 'Credenciales incorrectas.' },
    ],
  })
  async studentLogin(
    @Body() loginStudentDto: LoginStudentDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const token = await this.authService.studentLogin(loginStudentDto);
    // TODO: Terminar el apartado de las cookies
    res.cookie(TOKEN_NAME, token, {
      httpOnly: false, // Solo accesible por el backend (más seguro)
      secure: true, // Solo transmitida por HTTPS
      sameSite: 'none', // Necesario si vas a compartir la cookie entre dominios
      maxAge: 30 * 60 * 1000, // 30 minutos
      // domain: 'localhost',
    });
    return { message: 'Login exitoso' };
  }

  @Post('admins-login')
  @ApiCrudDocs({
    summary: 'Login de administradores (alta manual)',
    bodyType: LoginAdminDto,
    responses: [
      { status: 201, description: 'Login exitoso. Devuelve token JWT.' },
      { status: 401, description: 'Credenciales incorrectas.' },
    ],
  })
  async adminLogin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const token = await this.authService.adminLogin(loginAdminDto);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true, // Solo accesible por el backend (más seguro)
      secure: true, // Solo transmitida por HTTPS
      sameSite: 'none', // Necesario si vas a compartir la cookie entre dominios
      maxAge: 30 * 60 * 1000, // 30 minutos
    });
  }
}
