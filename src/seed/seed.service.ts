import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../subjects/entities/subject.entity';
import { Repository } from 'typeorm';
import subjects from './data/subjects.json';
import careers from './data/careers.json';
import { Career } from '../careers/entities/career.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,

    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {}

  async onModuleInit() {
    // El seed solo se ejecuta si no hay datos
    // Es seguro dejarlo siempre activo
    await this.seedSubjects();
    await this.seedCareers();
  }

  private async seedSubjects() {
    const count = await this.subjectRepository.count();

    if (count === 0) {
      this.logger.log('Sembrando materias...');

      try {
        await this.subjectRepository.save(subjects);
        this.logger.log(`${subjects.length} materias sembradas exitosamente`);
      } catch (error) {
        this.logger.error('Error al sembrar materias:', error.message);
      }
    } else {
      this.logger.log(`Materias ya sembradas (${count} registros)`);
    }
  }

  private async seedCareers() {
    const count = await this.careerRepository.count();

    if (count === 0) {
      this.logger.log('Sembrando carreras...');

      try {
        await this.careerRepository.save(careers);
        this.logger.log(`${careers.length} carreras sembradas exitosamente`);
      } catch (error) {
        this.logger.error('Error al sembrar carreras:', error.message);
      }
    } else {
      this.logger.log(`Carreras ya sembradas (${count} registros)`);
    }
  }
}
