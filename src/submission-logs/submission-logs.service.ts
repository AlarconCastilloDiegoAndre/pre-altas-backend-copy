// src/submission-logs/submission-logs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionLog } from './entities/submission-log.entity';
import { CreateSubmissionLogDto } from './dto/create-submission-log.dto';
import { QuerySubmissionLogDto } from './dto/query-submission-log.dto';
import { SubmissionAction } from './entities/submission-log.entity';

@Injectable()
export class SubmissionLogsService {
  constructor(
    @InjectRepository(SubmissionLog)
    private readonly repo: Repository<SubmissionLog>,
  ) {}

  async create(dto: CreateSubmissionLogDto): Promise<SubmissionLog> {
  // Construcción explícita para evitar problemas de DeepPartial en repo.create({...})
  const entity = new SubmissionLog();
  entity.actorAdminId = dto.actorAdminId;
  entity.studentId = dto.studentId ?? null;
  entity.entity = dto.entity;
  entity.entityId = String(dto.entityId);
  // 👇 casteo del enum del DTO al enum del entity
  entity.action = dto.action as unknown as SubmissionAction;
  entity.reason = dto.reason ?? null;
  entity.changesJson = (dto as any).changesJson ?? null;

  return this.repo.save(entity);
}

  async findAll(q: QuerySubmissionLogDto): Promise<SubmissionLog[]> {
    const qb = this.repo.createQueryBuilder('l').orderBy('l.ts', 'DESC');

    if (q.actorAdminId) qb.andWhere('l.actorAdminId = :admin', { admin: q.actorAdminId });
    if (q.studentId) qb.andWhere('l.studentId = :sid', { sid: q.studentId });
    if (q.entity) qb.andWhere('l.entity = :ent', { ent: q.entity });
    if (q.entityId) qb.andWhere('l.entityId = :eid', { eid: q.entityId });
    if (q.action) qb.andWhere('l.action = :act', { act: q.action });

    return qb.getMany();
  }

  async findOne(id: string): Promise<SubmissionLog> {
    const log = await this.repo.findOne({ where: { logId: id } as any });
    if (!log) throw new NotFoundException('Log no encontrado');
    return log;
  }
}
