import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiCrudDocs } from '../docs/api-crud-docs.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiCrudDocs({
    summary: 'Obtener todas las materias',
    responses: [
      { status: 200, description: 'Lista de materias obtenida correctamente.' },
    ],
  })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Post()
  @ApiCrudDocs({
    summary: 'Crear una nueva materia',
    bodyType: CreateSubjectDto,
    bodyExamples: {
      ejemplo1: {
        summary: 'Crear materia de Introduccion a la programación',
        value: {
          subjectId: 2005,
          name: 'Introduccion a la programación',
        },
      },
      ejemplo2: {
        summary: 'Crear materia de Desarrollo humano I',
        value: {
          subjectId: 2006,
          name: 'Desarrollo humano I',
        },
      },
    },
    responses: [
      { status: 201, description: 'Materia creada correctamente.' },
      { status: 400, description: 'Datos inválidos o materia duplicada.' },
    ],
  })
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get(':id')
  @ApiCrudDocs({
    summary: 'Obtener una materia por ID',
    paramName: 'id',
    paramType: Number,
    paramDescription: 'ID de la materia. Ejemplo: 2005',
    paramExample: 2005,
    responses: [
      { status: 200, description: 'Materia encontrada.' },
      { status: 404, description: 'Materia no encontrada.' },
    ],
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCrudDocs({
    summary: 'Actualizar una materia por ID',
    paramName: 'id',
    paramType: Number,
    paramDescription: 'ID de la materia. Ejemplo: 2005',
    paramExample: 2005,
    bodyType: UpdateSubjectDto,
    bodyExamples: {
      ejemplo1: {
        summary: 'Actualizar nombre de la materia',
        value: {
          name: 'Introduccion a la programacion - updated',
        },
      },
      ejemplo2: {
        summary: 'Actualizar nombre de la materia',
        value: {
          name: 'Desarrollo Humano I - updated',
        },
      },
    },
    responses: [
      { status: 200, description: 'Materia actualizada correctamente.' },
      { status: 404, description: 'Materia no encontrada.' },
    ],
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiCrudDocs({
    summary: 'Eliminar una materia por ID',
    paramName: 'id',
    paramType: Number,
    paramDescription: 'ID de la materia. Ejemplo: 2005',
    paramExample: 2005,
    responses: [
      { status: 200, description: 'Materia eliminada correctamente.' },
      { status: 404, description: 'Materia no encontrada.' },
    ],
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.subjectsService.remove(+id);
  }
}