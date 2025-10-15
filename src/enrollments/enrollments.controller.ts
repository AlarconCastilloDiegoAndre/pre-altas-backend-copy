// src/enrollments/enrollments.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  @ApiOperation({ summary: 'Crear un preregistro (enrollment)' })
  @ApiCreatedResponse({ description: 'Enrollment creado', type: Enrollment })
  @ApiBadRequestResponse({
    description: 'Duplicado (uq_student_subject_period) o payload inválido',
  })
  @Post()
  create(@Body() dto: CreateEnrollmentDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Listar todos los enrollments' })
  @ApiOkResponse({ type: Enrollment, isArray: true })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Obtener un enrollment por ID' })
  @ApiParam({ name: 'id', type: String, example: '1' })
  @ApiOkResponse({ type: Enrollment })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un enrollment' })
  @ApiParam({ name: 'id', type: String, example: '1' })
  @ApiOkResponse({ type: Enrollment })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto) {
    return this.service.update(id, dto);
  }

}
