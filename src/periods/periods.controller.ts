import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('periods')
@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los periodos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de periodos obtenida correctamente.',
  })
  findAll() {
    return this.periodsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo periodo' })
  @ApiResponse({ status: 201, description: 'Periodo creado correctamente.' })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o periodo duplicado.',
  })
  @ApiBody({ type: CreatePeriodDto })
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un periodo por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del periodo. Formato: 2025-ENE-JUN',
    example: '2025-ENE-JUN',
  })
  @ApiResponse({ status: 200, description: 'Periodo encontrado.' })
  @ApiResponse({ status: 404, description: 'Periodo no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un periodo por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del periodo. Formato: 2025-ENE-JUN',
    example: '2025-ENE-JUN',
  })
  @ApiBody({
    type: UpdatePeriodDto,
    examples: {
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
  })
  @ApiResponse({
    status: 200,
    description: 'Periodo actualizado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Periodo no encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updatePeriodDto: UpdatePeriodDto,
  ) {
    return this.periodsService.update(id, updatePeriodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un periodo por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID del periodo. Formato: 2025-ENE-JUN',
    example: '2025-ENE-JUN',
  })
  @ApiResponse({ status: 200, description: 'Periodo eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Periodo no encontrado.' })
  remove(@Param('id') id: string) {
    return this.periodsService.remove(id);
  }
}