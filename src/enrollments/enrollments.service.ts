// src/enrollments/enrollments.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly repo: Repository<Enrollment>,
  ) {}

  async create(dto: CreateEnrollmentDto) {
    const e = this.repo.create(dto as any);
    try {
      return await this.repo.save(e);
    } catch (err: any) {
      //  Añadido: mapear unique_violation (23505) a 400
      const code = err?.code; // PG error code
      const constraint = err?.constraint ?? '';
      const detail = (err?.detail || err?.message || '').toLowerCase();

      if (
        code === '23505' ||                              // unique_violation
        constraint === 'uq_student_subject_period' ||    // nombre de la UNIQUE
        detail.includes('uq_student_subject_period') ||  // por si viene en detail
        detail.includes('duplicate') ||                  // fallback genérico
        detail.includes('unique')
      ) {
        throw new BadRequestException(
          'Duplicado: (studentId, careerSubjectId, periodId) ya existe.',
        );
      }

      // (Mantenemos el throw original para otros errores)
      throw err;
    }
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const e = await this.repo.findOne({ where: { enrollmentId: id } as any });
    if (!e) throw new NotFoundException('Enrollment no encontrado');
    return e;
  }

  async update(id: string, dto: UpdateEnrollmentDto) {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.repo.save(e);
  }

}
