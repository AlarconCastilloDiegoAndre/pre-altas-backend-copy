import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CareerSubjectsService } from './career-subjects.service';
import { CreateCareerSubjectDto } from './dto/create-career-subject.dto';
import { UpdateCareerSubjectDto } from './dto/update-career-subject.dto';
import { ApiCrudDocs } from '../docs/api-crud-docs.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('career-subjects')
@Controller('career-subjects')
export class CareerSubjectsController {
  constructor(private readonly careerSubjectsService: CareerSubjectsService) {}

  @Post()
  @ApiCrudDocs({
    summary: 'Crea una nueva asociación entre carrera y materia',
    bodyType: CreateCareerSubjectDto,
    bodyExamples: {
      ejemplo1: {
        summary:
          'Asignar Introducción a la programación a Ingeniería en Software en el primer semestre',
        value: {
          careerId: 'SOF18',
          subjectId: 2005,
          semester: 1,
        },
      },
      ejemplo2: {
        summary:
          'Asignar Desarrollo humano I a Ingeniería en Software en el segundo semestre',
        value: {
          careerId: 'SOF18',
          subjectId: 2006,
          semester: 2,
        },
      },
    },
    responses: [
      { status: 201, description: 'Asociación creada correctamente.' },
      { status: 400, description: 'Datos inválidos o asociación duplicada.' },
    ],
  })
  create(@Body() createCareerSubjectDto: CreateCareerSubjectDto) {
    return this.careerSubjectsService.create(createCareerSubjectDto);
  }

  @Get()
  @ApiCrudDocs({
    summary: 'Consulta asociaciones por carrera y semestre',
    queries: [
      {
        name: 'career_id',
        required: false,
        type: String,
        example: 'SOF18',
        description: 'ID de la carrera para filtrar.',
      },
      {
        name: 'semester',
        required: false,
        type: Number,
        example: 1,
        description: 'Semestre para filtrar.',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Lista de asociaciones obtenida correctamente.',
      },
    ],
  })
  findByCareerAndSemester(
    @Query('career_id') careerId?: string,
    @Query('semester') semester?: number,
  ) {
    return this.careerSubjectsService.findByCareerAndSemester(
      careerId,
      semester,
    );
  }

  @Put(':career_subject_id')
  @ApiCrudDocs({
    summary: 'Actualiza una asociación existente',
    paramName: 'career_subject_id',
    paramType: Number,
    paramDescription: 'ID de la asociación. Ejemplo: 1',
    paramExample: 1,
    bodyType: UpdateCareerSubjectDto,
    bodyExamples: {
      ejemplo1: {
        summary: 'Actualizar el semestre de la asociación',
        value: {
          semester: 3,
        },
      },
      ejemplo2: {
        summary: 'Actualizar la materia asignada',
        value: {
          subjectId: 2007,
        },
      },
    },
    responses: [
      { status: 200, description: 'Asociación actualizada correctamente.' },
      { status: 404, description: 'Asociación no encontrada.' },
    ],
  })
  update(
    @Param('career_subject_id', ParseIntPipe) careerSubjectId: number,
    @Body() updateCareerSubjectDto: UpdateCareerSubjectDto,
  ) {
    return this.careerSubjectsService.update(
      careerSubjectId,
      updateCareerSubjectDto,
    );
  }

  @Delete(':career_subject_id')
  @ApiCrudDocs({
    summary: 'Elimina una asociación',
    paramName: 'career_subject_id',
    paramType: Number,
    paramDescription: 'ID de la asociación. Ejemplo: 1',
    paramExample: 1,
    responses: [
      { status: 200, description: 'Asociación eliminada correctamente.' },
      { status: 404, description: 'Asociación no encontrada.' },
    ],
  })
  remove(@Param('career_subject_id', ParseIntPipe) careerSubjectId: number) {
    return this.careerSubjectsService.remove(careerSubjectId);
  }
}
