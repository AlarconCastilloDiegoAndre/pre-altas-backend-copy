import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from './constants/roles.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly jwtService: JwtService,
    // TODO: Agregar el repositorio de admin cuando este terminado
  ) {}

  async studentRegister(createStudentDto: CreateStudentDto) {
    // Verificar si el estudiante ya esta en la base de datos por studentId
    const existingStudent = await this.studentRepository.findOne({
      where: { studentId: createStudentDto.studentId },
    });

    if (existingStudent) {
      throw new BadRequestException('El expediente ya esta registrado');
    }

    // Verificar si el email ya está en la base de datos
    const existingEmail = await this.studentRepository.findOne({
      where: { email: createStudentDto.email },
    });

    if (existingEmail) {
      throw new BadRequestException('El email ya está registrado');
    }

    const student = this.studentRepository.create(createStudentDto);

    // Hashear contraseña
    student.password = await bcrypt.hash(createStudentDto.password, 10);
    await this.studentRepository.save(student);
    return 'Registro exitoso';
  }

  async studentLogin(loginStudentDto: LoginStudentDto) {
    const student = await this.studentRepository.findOne({
      where: { studentId: loginStudentDto.studentId },
    });

    if (!student)
      throw new UnauthorizedException('Usuario y/o contraseñas invalidos');

    // Verificar la contraseña, encripta la contraseña ingresada y la compara con la almacenada
    const isPasswordValid = await bcrypt.compare(
      loginStudentDto.password,
      student.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuario y/o contraseña incorrectos');
    }

    // Genera JWT con el payload de student
    return this.jwtService.sign({
      sub: student.studentId,
      role: ROLE.STUDENTS,
    });
  }

  async adminLogin(loginAdminDto: LoginAdminDto) {}
}
