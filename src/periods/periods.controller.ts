import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCrudDocs } from '../docs/api-crud-docs.decorator';

@ApiTags('periods')
@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Get()
  @ApiCrudDocs({
    summary: 'Obtener todos los periodos',
    responses: [
      { status: 200, description: 'Lista de periodos obtenida correctamente.' },
    ],
  })
  findAll() {
    return this.periodsService.findAll();
  }

  @Post()
  @ApiCrudDocs({
    summary: 'Crear un nuevo periodo',
    bodyType: CreatePeriodDto,
    responses: [
      { status: 201, description: 'Periodo creado correctamente.' },
      { status: 400, description: 'Datos inválidos o periodo duplicado.' },
    ],
  })
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get(':id')
  @ApiCrudDocs({
    summary: 'Obtener un periodo por ID',
    paramName: 'id',
    paramType: String,
    paramDescription: 'ID del periodo. Formato: 2025-ENE-JUN',
    paramExample: '2025-ENE-JUN',
    responses: [
      { status: 200, description: 'Periodo encontrado.' },
      { status: 404, description: 'Periodo no encontrado.' },
    ],
  })
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(id);
  }

  @Patch(':id')
  @ApiCrudDocs({
    summary: 'Actualizar un periodo por ID',
    paramName: 'id',
    paramType: String,
    paramDescription: 'ID del periodo. Formato: 2025-ENE-JUN',
    paramExample: '2025-ENE-JUN',
    bodyType: UpdatePeriodDto,
    bodyExamples: {
      ejemplo1: {
        summary: 'Actualizar fecha de fin del periodo',
        value: {
          endDate: '1900-06-30',
        },
      },
      ejemplo2: {
        summary: 'Activar el periodo',
        value: {
          active: true,
        },
      },
    },
    responses: [
      { status: 200, description: 'Periodo actualizado correctamente.' },
      { status: 404, description: 'Periodo no encontrado.' },
    ],
  })
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(id, updatePeriodDto);
  }

  @Delete(':id')
  @ApiCrudDocs({
    summary: 'Eliminar un periodo por ID',
    paramName: 'id',
    paramType: String,
    paramDescription: 'ID del periodo. Formato: 2025-ENE-JUN',
    paramExample: '2025-ENE-JUN',
    responses: [
      { status: 200, description: 'Periodo eliminado correctamente.' },
      { status: 404, description: 'Periodo no encontrado.' },
    ],
  })
  remove(@Param('id') id: string) {
    return this.periodsService.remove(id);
  }
}