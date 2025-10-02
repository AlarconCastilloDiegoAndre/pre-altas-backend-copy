import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) {}

  async findAll() {
    return this.subjectsRepository.find();
  }

  async create(createSubjectDto: CreateSubjectDto) {
    // Buscar si ya existe el id de materia
    const existing = await this.subjectsRepository.findOne({ where: { subjectId: createSubjectDto.subjectId } });
    if (existing) {
      throw new BadRequestException('Ya existe una materia con ese id');
    }
    return this.subjectsRepository.save(createSubjectDto);
  }

  async findOne(id: number) {
    const subject = await this.subjectsRepository.findOne({ where: { subjectId: id } });
    if (!subject) throw new NotFoundException('Materia no encontrada');
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);
    await this.subjectsRepository.update({ subjectId: id }, updateSubjectDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.subjectsRepository.delete({ subjectId: id });
  }
}