// src/submission-logs/submission-logs.controller.ts
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SubmissionLogsService } from './submission-logs.service';
import { CreateSubmissionLogDto } from './dto/create-submission-log.dto';
import { QuerySubmissionLogDto } from './dto/query-submission-log.dto';
import { SubmissionLog } from './entities/submission-log.entity';

@ApiTags('Submission Logs')
@Controller('submission-logs')
export class SubmissionLogsController {
  constructor(private readonly service: SubmissionLogsService) {}

  @ApiOperation({ summary: 'Crear entrada de bitácora' })
  @ApiCreatedResponse({ type: SubmissionLog, description: 'Log creado' })
  @ApiBadRequestResponse({ description: 'Payload inválido o violación de FK' })
  @Post()
  create(@Body() dto: CreateSubmissionLogDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Listar logs con filtros' })
  @ApiQuery({ name: 'actorAdminId', required: false, description: 'UUID del admin' })
  @ApiQuery({ name: 'studentId', required: false, type: Number })
  @ApiQuery({ name: 'entity', required: false, example: 'ENROLLMENTS' })
  @ApiQuery({ name: 'entityId', required: false, example: '1' })
  @ApiQuery({ name: 'action', required: false, enum: ['create', 'update', 'delete', 'confirm', 'block'] })
  @ApiOkResponse({ type: SubmissionLog, isArray: true })
  @Get()
  findAll(@Query() q: QuerySubmissionLogDto) {
    return this.service.findAll(q);
  }

  @ApiOperation({ summary: 'Obtener un log por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: SubmissionLog })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
