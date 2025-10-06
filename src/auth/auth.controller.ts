import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginStudentDto } from './dto/login-student.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { TOKEN_NAME } from './constants/jwt.constants';
import express from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('students-register')
  @ApiOperation({ summary: 'Registrar un nuevo estudiante' })
  @ApiResponse({
    status: 201,
    description: 'Estudiante registrado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o estudiante ya existe.',
  })
  @ApiBody({ type: CreateStudentDto })
  async studentRegister(@Body() createStudentDto: CreateStudentDto) {
    return this.authService.studentRegister(createStudentDto);
  }

  @Post('students-login')
  @ApiOperation({ summary: 'Login de estudiantes' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso. Devuelve token JWT.',
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  @ApiBody({ type: LoginStudentDto })
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
  @ApiOperation({ summary: 'Login de administradores (alta manual)' })
  @ApiResponse({
    status: 201,
    description: 'Login exitoso. Devuelve token JWT.',
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  @ApiBody({ type: LoginAdminDto })
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
