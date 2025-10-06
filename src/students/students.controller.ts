import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import * as nestjsPaginate from 'nestjs-paginate';
import { Student } from './entities/student.entity';

// TODO: Asegurar esta ruta para que los estudiantes no puedan acceder y solo los admins
@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estudiantes con paginación' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Número de página (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Cantidad de registros por página (default: 10)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Texto a buscar (por nombre o studentId)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    isArray: true,
    type: String,
    example: ['studentId:ASC'],
    description:
      'Ordenar por columna y nombre. Ejemplo: studentId:ASC o name:DESC',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de estudiantes obtenida correctamente con metadatos de paginación.',
    schema: {
      example: {
        data: [
          {
            studentId: 12345,
            name: 'Juan Pérez',
            email: 'juan@example.com',
            groupNo: 101,
            semester: 3,
            plan: 'Ingeniería en Sistemas',
          },
        ],
        meta: {
          totalItems: 42,
          itemCount: 10,
          itemsPerPage: 10,
          totalPages: 5,
          currentPage: 1,
        },
        links: {
          first: '/students?page=1&limit=10',
          previous: '',
          next: '/students?page=2&limit=10',
          last: '/students?page=5&limit=10',
        },
      },
    },
  })
  async findAll(
    @nestjsPaginate.Paginate() query: nestjsPaginate.PaginateQuery,
  ): Promise<nestjsPaginate.Paginated<Student>> {
    return this.studentsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID (expediente) del estudiante',
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado.',
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un estudiante por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID (expediente) del estudiante',
  })
  @ApiBody({
    type: UpdateStudentDto,
    examples: {
      ejemplo1: {
        summary: 'Actualizar nombre y grupo del estudiante',
        value: {
          name: 'Juan Pérez Actualizado',
          groupNo: 102,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante actualizado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estudiante por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID (expediente) del estudiante',
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante eliminado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.studentsService.remove(+id);
  }
}
