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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las materias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de materias obtenida correctamente.',
  })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva materia' })
  @ApiResponse({
    status: 201,
    description: 'Materia creada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o materia duplicada.',
  })
  @ApiBody({
    type: CreateSubjectDto,
    examples: {
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
  })
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una materia por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la materia. Ejemplo: 2005',
    example: 2005,
  })
  @ApiResponse({
    status: 200,
    description: 'Materia encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Materia no encontrada.',
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una materia por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la materia. Ejemplo: 2005',
    example: 2005,
  })
  @ApiBody({
    type: UpdateSubjectDto,
    examples: {
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
  })
  @ApiResponse({
    status: 200,
    description: 'Materia actualizada correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Materia no encontrada.',
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una materia por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la materia. Ejemplo: 2005',
    example: 2005,
  })
  @ApiResponse({
    status: 200,
    description: 'Materia eliminada correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Materia no encontrada.',
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.subjectsService.remove(+id);
  }
}