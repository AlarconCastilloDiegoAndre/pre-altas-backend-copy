import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCareerSubjectDto } from './dto/create-career-subject.dto';
import { UpdateCareerSubjectDto } from './dto/update-career-subject.dto';
import { Career } from '../careers/entities/career.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { CareerSubject } from './entity/career-subject.entity';

/**
 * Service encargado de manejar la lógica de negocio para la entidad CareerSubject (Asignación materia-carrera).
 * Proporciona métodos para crear, obtener, actualizar y eliminar asignaciones.
 */
@Injectable()
export class CareerSubjectsService {
  constructor(
    @InjectRepository(CareerSubject)
    private readonly careerSubjectsRepository: Repository<CareerSubject>,
    @InjectRepository(Career)
    private readonly careersRepository: Repository<Career>,
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) {}

  async create(dto: CreateCareerSubjectDto) {
    const career = await this.careersRepository.findOne({
      where: { careerId: dto.careerId },
    });
    if (!career) throw new BadRequestException('Carrera no encontrada');

    const subject = await this.subjectsRepository.findOne({
      where: { subjectId: dto.subjectId },
    });
    if (!subject) throw new BadRequestException('Materia no encontrada');

    const existing = await this.careerSubjectsRepository.findOne({
      where: {
        career: { careerId: dto.careerId },
        subject: { subjectId: dto.subjectId },
        semester: dto.semester,
      },
      relations: ['career', 'subject'],
    });
    if (existing) {
      throw new BadRequestException(
        'Ya existe esta asignación de materia a carrera en ese semestre',
      );
    }

    const careerSubject = this.careerSubjectsRepository.create({
      career,
      subject,
      semester: dto.semester,
    });
    return await this.careerSubjectsRepository.save(careerSubject);
  }

  async findOne(id: number) {
    const assignment = await this.careerSubjectsRepository.findOne({
      where: { career_subject_id: id },
      relations: ['career', 'subject'],
    });
    if (!assignment) throw new NotFoundException('Asignación no encontrada');
    return assignment;
  }

  async update(id: number, dto: UpdateCareerSubjectDto) {
    const assignment = await this.findOne(id);

    if (dto.careerId) {
      const career = await this.careersRepository.findOne({
        where: { careerId: dto.careerId },
      });
      if (!career) throw new BadRequestException('Carrera no encontrada');
      assignment.career = career;
    }

    if (dto.subjectId) {
      const subject = await this.subjectsRepository.findOne({
        where: { subjectId: dto.subjectId },
      });
      if (!subject) throw new BadRequestException('Materia no encontrada');
      assignment.subject = subject;
    }

    if (dto.semester !== undefined) {
      assignment.semester = dto.semester;
    }

    await this.careerSubjectsRepository.save(assignment);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    const deleteResult = await this.careerSubjectsRepository.delete({
      career_subject_id: id,
    });
    if (deleteResult.affected === 0) {
      throw new InternalServerErrorException(
        `No se pudo eliminar la asignación con ID "${id}"`,
      );
    }
    return { message: 'Asignación eliminada correctamente' };
  }

  /**
   * Obtiene todas las asignaciones de materias para una carrera y semestre específico.
   * @param careerId ID de la carrera.
   * @param semester Número de semestre.
   * @returns Promesa con arreglo de asignaciones (CareerSubject), cada una con solo el id de la carrera.
   * @throws NotFoundException si no se encuentra la carrera.
   */
  async findByCareerAndSemester(
    careerId: string | undefined,
    semester: number | undefined,
  ) {
    const career = await this.careersRepository.findOne({
      where: { careerId },
    });
    if (!career) throw new NotFoundException('Carrera no encontrada');

    const asignaciones = await this.careerSubjectsRepository.find({
      where: {
        career: { careerId },
        semester,
      },
      relations: ['career', 'subject'],
    });

    // Transformar las asignaciones para que solo incluyan careerId
    return asignaciones.map(asignacion => ({
      ...asignacion,
      career: asignacion.career.careerId,
    }));
  }
}