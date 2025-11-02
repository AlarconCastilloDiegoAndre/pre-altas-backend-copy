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
import { Admin } from '../admins/entities/admin.entity';
import { Career } from '../careers/entities/career.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
    private readonly jwtService: JwtService,
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

    // Verificar que el plan de estudios exista en la bd
    const existingCareer = await this.careerRepository.findOne({
      where: { careerId: createStudentDto.career_id },
    });
    if (!existingCareer) {
      throw new BadRequestException('La carrera no existe en la base de datos');
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
      roles: [ROLE.STUDENT],
    });
  }

  async adminLogin(loginAdminDto: LoginAdminDto) {
    const admin = await this.adminRepository.findOne({
      where: {
        username: loginAdminDto.username,
        password: loginAdminDto.password,
      },
    });

    if (!admin)
      throw new UnauthorizedException('Usuario y/o contraseña incorrectos');


    // TODO: Implementar comparacion con contraseña hasheada
    const payload = {
      sub: admin.username, // O admin.id, lo que uses como "subject"
      roles: [ROLE.ADMIN],
    };

    const token = this.jwtService.sign(payload);

    return {
      token: token,
      profile: {
        name: admin.name,
        username: admin.username,
        department: admin.assignedDepartment,
        rol: ROLE.ADMIN,
      }
    };
  }

  async getProfile(user: JwtPayload) {
    // Verificar si el que hizo la peticion es un estudiante o un admin
    if (user.roles.includes(ROLE.ADMIN)) {
      const admin = await this.adminRepository.findOne({
        where: { username: user.sub as string},
      });

      // Si el token es válido, pero el usuario ya no existe en la BD, forzar un error de "No autorizado".
      if (!admin) {
        throw new UnauthorizedException('El usuario admin de este token ya no existe');
      }

      return {
        name: admin.name,
        username: admin.username,
        department: admin.assignedDepartment,
        rol: 'Admin',
      };



    } else if (user.roles.includes(ROLE.STUDENT)) { // (Usar 'else if' es más seguro que 'else')
      const student = await this.studentRepository.findOne({
        where: { studentId: user.sub as number },
      });

      // Si el token es válido, pero el usuario ya no existe en la BD, forzar un error de "No autorizado".
      if (!student) {
        throw new UnauthorizedException('El usuario estudiante de este token ya no existe');
      }

      return {
        studentId: student.studentId,
        name: student.name,
        groupNo: student.groupNo,
        semester: student.semester,
        career_id: student.career,
        rol: 'Student',
      };
    }

    // Si el token no tiene un rol ni de Admin ni de Student
    throw new UnauthorizedException('Rol de usuario no reconocido');
  }
}
