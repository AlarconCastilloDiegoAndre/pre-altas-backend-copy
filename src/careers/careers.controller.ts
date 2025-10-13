import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCrudDocs } from '../docs/api-crud-docs.decorator';

@ApiTags('careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get()
  @ApiCrudDocs({
    summary: 'Obtener todas las carreras',
    responses: [
      { status: 200, description: 'Lista de carreras obtenida correctamente.' },
    ],
  })
  findAll() {
    return this.careersService.findAll();
  }

  @Post()
  @ApiCrudDocs({
    summary: 'Crear una nueva carrera',
    bodyType: CreateCareerDto,
    bodyExamples: {
      ejemplo1: {
        summary: 'Crear carrera(plan) de Ingeniería de Software',
        value: {
          careerId: 'SOF18',
          name: 'Ingeniería en Software',
        },
      },
      ejemplo2: {
        summary: 'Crear carrera(plan) de Licenciatura en informatica',
        value: {
          careerId: 'INF18',
          name: 'Licenciatura en informatica',
        },
      },
    },
    responses: [
      { status: 201, description: 'Carrera creada correctamente.' },
      { status: 400, description: 'Datos inválidos o carrera duplicada.' },
    ],
  })
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careersService.create(createCareerDto);
  }

  @Get(':id')
  @ApiCrudDocs({
    summary: 'Obtener una carrera por ID',
    paramName: 'id',
    paramType: String,
    paramDescription: 'ID de la carrera. Ejemplo: SOF18',
    paramExample: 'SOF18',
    responses: [
      { status: 200, description: 'Carrera encontrada.' },
      { status: 404, description: 'Carrera no encontrada.' },
    ],
  })
  findOne(@Param('id') id: string) {
    return this.careersService.findOne(id);
  }

  @Patch(':id')
  @ApiCrudDocs({
    summary: 'Actualizar una carrera por ID',
    paramName: 'id',
    paramType: String,
    paramDescription: 'ID de la carrera. Ejemplo: SOF18',
    paramExample: 'SOF18',
    bodyType: UpdateCareerDto,
    bodyExamples: {
      ejemplo1: {
        summary: 'Actualizar nombre de la carrera',
        value: {
          name: 'Ingeniería de software - updated',
        },
      },
      ejemplo2: {
        summary: 'Actualizar nombre de la carrera',
        value: {
          name: 'Licenciatura en informatica - updated',
        },
      },
    },
    responses: [
      { status: 200, description: 'Carrera actualizada correctamente.' },
      { status: 404, description: 'Carrera no encontrada.' },
    ],
  })
  update(@Param('id') id: string, @Body() updateCareerDto: UpdateCareerDto) {
    return this.careersService.update(id, updateCareerDto);
  }

  @Delete(':id')
  @ApiCrudDocs({
    summary: 'Eliminar una carrera por ID',
    paramName: 'id',
    paramType: String,
    paramDescription: 'ID de la carrera. Ejemplo: SOF18',
    paramExample: 'SOF18',
    responses: [
      { status: 200, description: 'Carrera eliminada correctamente.' },
      { status: 404, description: 'Carrera no encontrada.' },
    ],
  })
  remove(@Param('id') id: string) {
    return this.careersService.remove(id);
  }
}