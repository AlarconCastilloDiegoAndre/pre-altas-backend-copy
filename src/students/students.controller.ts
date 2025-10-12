import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as nestjsPaginate from 'nestjs-paginate';
import { Student } from './entities/student.entity';
import { ApiCrudDocs } from '../docs/api-crud-docs.decorator';

/**
 * Controlador encargado de gestionar las rutas relacionadas con la entidad Student (Estudiante).
 * Incluye endpoints para listar, consultar, actualizar y eliminar estudiantes.
 * El endpoint de listado soporta paginación, búsqueda y ordenamiento.
 */
import { ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiCrudDocs({
    summary:
      'Obtener todos los estudiantes con paginación, búsqueda y ordenamiento',
    queries: [
      {
        name: 'page',
        required: false,
        type: Number,
        example: 1,
        description: 'Número de página (default: 1)',
      },
      {
        name: 'limit',
        required: false,
        type: Number,
        example: 10,
        description: 'Cantidad de registros por página (default: 10)',
      },
      {
        name: 'search',
        required: false,
        type: String,
        description: 'Texto a buscar (por nombre o studentId)',
      },
      {
        name: 'sortBy',
        required: false,
        isArray: true,
        type: String,
        example: ['studentId:ASC'],
        description:
          'Ordenar por columna y dirección. Ejemplo: studentId:ASC o name:DESC',
      },
    ],
    responses: [
      {
        status: 200,
        description:
          'Lista de estudiantes obtenida correctamente con metadatos de paginación, búsqueda y ordenamiento.',
      },
    ],
  })
  findAll(
    @nestjsPaginate.Paginate() query: nestjsPaginate.PaginateQuery,
  ): Promise<nestjsPaginate.Paginated<Student>> {
    return this.studentsService.findAll(query);
  }

  @Get(':id')
  @ApiCrudDocs({
    summary: 'Obtener un estudiante por su ID (expediente)',
    paramName: 'id',
    paramType: Number,
    paramDescription: 'ID (expediente) del estudiante. Ejemplo: 202312345',
    paramExample: 202312345,
    responses: [
      {
        status: 200,
        description: 'Estudiante encontrado (sin el campo contraseña).',
      },
      {
        status: 404,
        description: 'Estudiante no encontrado.',
      },
    ],
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiCrudDocs({
    summary: 'Actualizar los datos de un estudiante por ID',
    paramName: 'id',
    paramType: Number,
    paramDescription: 'ID (expediente) del estudiante. Ejemplo: 202312345',
    paramExample: 202312345,
    bodyType: UpdateStudentDto,
    bodyExamples: {
      ejemplo1: {
        summary: 'Actualizar nombre y grupo del estudiante',
        value: {
          name: 'Juan Pérez Actualizado',
          groupNo: 102,
        },
      },
      ejemplo2: {
        summary: 'Actualizar plan y semestre',
        value: {
          plan: 'Licenciatura en Matemáticas',
          semester: 6,
        },
      },
    },
    responses: [
      {
        status: 200,
        description: 'Estudiante actualizado correctamente.',
      },
      {
        status: 404,
        description: 'Estudiante no encontrado.',
      },
    ],
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiCrudDocs({
    summary: 'Eliminar un estudiante por su ID (expediente)',
    paramName: 'id',
    paramType: Number,
    paramDescription: 'ID (expediente) del estudiante. Ejemplo: 202312345',
    paramExample: 202312345,
    responses: [
      {
        status: 200,
        description: 'Estudiante eliminado correctamente.',
      },
      {
        status: 404,
        description: 'Estudiante no encontrado.',
      },
    ],
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.studentsService.remove(+id);
  }
}