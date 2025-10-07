import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo administrador' })
  @ApiResponse({ status: 201, description: 'Administrador creado correctamente.' })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o administrador duplicado.',
  })
  @ApiBody({ type: CreateAdminDto })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un administrador por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del administrador (UUID).',
    example: 'd6f4e3b1-7c21-4c6d-b9d8-9c6e4f4c6f4e',
  })
  @ApiBody({
    type: UpdateAdminDto,
    examples: {
      ejemplo1: {
        summary: 'Actualizar nombre y departamento',
        value: {
          name: 'Ana Gómez',
          assignedDepartment: 'Finanzas',
        },
      },
      ejemplo2: {
        summary: 'Actualizar contraseña',
        value: {
          password: 'NuevaContraseñaSegura2025!',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Administrador actualizado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Administrador no encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un administrador por ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del administrador (UUID).',
    example: 'd6f4e3b1-7c21-4c6d-b9d8-9c6e4f4c6f4e',
  })
  @ApiResponse({ status: 200, description: 'Administrador eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Administrador no encontrado.' })
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
