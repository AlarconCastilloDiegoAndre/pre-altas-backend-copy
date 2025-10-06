import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateStudentDto } from '../auth/dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

/**
 * Servicio encargado de la lógica de negocio para la entidad Student (Estudiante).
 * Proporciona métodos para crear, obtener, actualizar y eliminar estudiantes.
 */
@Injectable()
export class StudentsService {
  /**
   * Inyecta el repositorio de TypeORM para la entidad Student.
   * @param studentsRepository Repositorio de la entidad Student.
   */
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  /**
   * Obtiene todos los estudiantes registrados en la base de datos.
   * @returns Promesa con un arreglo de objetos Student.
   */
  async findAll(query: PaginateQuery): Promise<Paginated<Student>> {
    return paginate(query, this.studentsRepository, {
      sortableColumns: [
        'studentId',
        'name',
        'email',
        'groupNo',
        'semester',
        'plan',
      ],
      defaultSortBy: [['studentId', 'ASC']],
      searchableColumns: ['studentId','name'],
    });
  }

  /**
   * Busca y obtiene un estudiante por su studentId.
   * @param id Identificador único del estudiante.
   * @throws NotFoundException si no se encuentra el estudiante.
   * @returns Promesa con el objeto Student encontrado (sin la contraseña).
   */
  async findOne(id: number) {
    const student = await this.studentsRepository.findOne({
      where: { studentId: id },
    });
    if (!student) throw new NotFoundException('Estudiante no encontrado');

    // Crea una copia sin la contraseña
    const { password, ...studentWithoutPassword } = student;
    return studentWithoutPassword;
  }

  /**
   * Actualiza los datos de un estudiante existente.
   * @param id Identificador único del estudiante a actualizar.
   * @param updateStudentDto Datos a actualizar en el estudiante.
   * @throws NotFoundException si el estudiante no existe.
   * @returns Promesa con el objeto Student actualizado.
   */
  async update(id: number, updateStudentDto: UpdateStudentDto) {
    await this.findOne(id);
    await this.studentsRepository.update({ studentId: id }, updateStudentDto);
    return this.findOne(id);
  }

  /**
   * Elimina un estudiante de la base de datos por su studentId.
   * @param id Identificador único del estudiante a eliminar.
   * @throws NotFoundException si el estudiante no existe.
   * @returns Promesa que se resuelve al eliminar el estudiante.
   */
  async remove(id: number) {
    await this.findOne(id);
    await this.studentsRepository.delete({ studentId: id });
  }
}
