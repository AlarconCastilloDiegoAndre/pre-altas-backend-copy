import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCrudDocs } from '../docs/api-crud-docs.decorator';

@ApiTags('admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiCrudDocs({
    summary: 'Crear un nuevo administrador',
    bodyType: CreateAdminDto,
    responses: [
      { status: 201, description: 'Administrador creado correctamente.' },
      {
        status: 400,
        description: 'Datos inválidos o administrador duplicado.',
      },
    ],
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Patch(':id')
  @ApiCrudDocs({
    summary: 'Actualizar un administrador por ID',
    paramName: 'id',
    paramType: String,
    paramDescription: 'ID único del administrador (UUID).',
    paramExample: 'd6f4e3b1-7c21-4c6d-b9d8-9c6e4f4c6f4e',
    bodyType: UpdateAdminDto,
    bodyExamples: {
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
    responses: [
      { status: 200, description: 'Administrador actualizado correctamente.' },
      { status: 404, description: 'Administrador no encontrado.' },
    ],
  })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @ApiCrudDocs({
    summary: 'Eliminar un administrador por ID',
    paramName: 'id',
    paramType: String,
    paramDescription: 'ID único del administrador (UUID).',
    paramExample: 'd6f4e3b1-7c21-4c6d-b9d8-9c6e4f4c6f4e',
    responses: [
      { status: 200, description: 'Administrador eliminado correctamente.' },
      { status: 404, description: 'Administrador no encontrado.' },
    ],
  })
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}