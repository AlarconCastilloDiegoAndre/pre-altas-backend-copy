import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';

/**
 * Service encargado de manejar la lógica de negocio para la entidad Subject (Materia).
 * Proporciona métodos para crear, obtener, actualizar y eliminar materias.
 */
@Injectable()
export class SubjectsService {
  /**
   * Inyecta el repositorio de TypeORM para la entidad Subject.
   * @param subjectsRepository Repositorio de la entidad Subject.
   */
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) {}

  /**
   * Obtiene todas las materias registradas en la base de datos.
   * @returns Promesa con un arreglo de objetos Subject.
   */
  async findAll() {
    return await this.subjectsRepository.find();
  }

  /**
   * Crea una nueva materia en la base de datos.
   * Verifica que no exista previamente una materia con el mismo subjectId.
   * @param createSubjectDto Datos para crear la materia.
   * @throws BadRequestException si ya existe una materia con el subjectId proporcionado.
   * @returns Promesa con el objeto Subject creado.
   */
  async create(createSubjectDto: CreateSubjectDto) {
    // Buscar si ya existe el id de materia
    const existing = await this.subjectsRepository.findOne({
      where: { subjectId: createSubjectDto.subjectId },
    });
    if (existing) {
      throw new BadRequestException('Ya existe una materia con ese id');
    }
    return await this.subjectsRepository.save(createSubjectDto);
  }

  /**
   * Busca y obtiene una materia por su subjectId.
   * @param id Identificador único de la materia.
   * @throws NotFoundException si no se encuentra la materia.
   * @returns Promesa con el objeto Subject encontrado.
   */
  async findOne(id: number) {
    const subject = await this.subjectsRepository.findOne({
      where: { subjectId: id },
    });
    if (!subject) throw new NotFoundException('Materia no encontrada');
    return subject;
  }

  /**
   * Actualiza los datos de una materia existente.
   * @param id Identificador único de la materia a actualizar.
   * @param updateSubjectDto Datos a actualizar en la materia.
   * @throws NotFoundException si la materia no existe.
   * @returns Promesa con el objeto Subject actualizado.
   */
  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);
    await this.subjectsRepository.update({ subjectId: id }, updateSubjectDto);
    return this.findOne(id);
  }

  /**
   * Elimina una materia de la base de datos por su subjectId.
   * @param id Identificador único de la materia a eliminar.
   * @throws NotFoundException si la materia no existe.
   * @returns Promesa que se resuelve al eliminar la materia.
   */
  async remove(id: number) {
    await this.findOne(id);
    const deleteResult = await this.subjectsRepository.delete({ subjectId: id });
    if (deleteResult.affected === 0) {
      throw new InternalServerErrorException(
        `No se pudo eliminar la materia con ID "${id}"`,
      );
    }
    return { message: 'Materia eliminada correctamente' };
  }
}
