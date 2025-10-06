import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Body,
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

/**
 * Controlador encargado de gestionar las rutas relacionadas con la entidad Student (Estudiante).
 * Incluye endpoints para listar, consultar, actualizar y eliminar estudiantes.
 * El endpoint de listado soporta paginación, búsqueda y ordenamiento.
 */
@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Obtener todos los estudiantes con paginación, búsqueda y ordenamiento',
  })
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
      'Ordenar por columna y dirección. Ejemplo: studentId:ASC o name:DESC',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de estudiantes obtenida correctamente con metadatos de paginación, búsqueda y ordenamiento.',
  })
  findAll(
    @nestjsPaginate.Paginate() query: nestjsPaginate.PaginateQuery,
  ): Promise<nestjsPaginate.Paginated<Student>> {
    return this.studentsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por su ID (expediente)' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID (expediente) del estudiante. Ejemplo: 202312345',
    example: 202312345,
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado (sin el campo contraseña).',
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar los datos de un estudiante por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID (expediente) del estudiante. Ejemplo: 202312345',
    example: 202312345,
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
      ejemplo2: {
        summary: 'Actualizar plan y semestre',
        value: {
          plan: 'Licenciatura en Matemáticas',
          semester: 6,
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
  @ApiOperation({ summary: 'Eliminar un estudiante por su ID (expediente)' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID (expediente) del estudiante. Ejemplo: 202312345',
    example: 202312345,
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
