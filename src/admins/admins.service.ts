import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

/**
 * Service encargado de manejar la lógica de negocio para la entidad Admin.
 * Proporciona métodos para crear, obtener, actualizar y eliminar administradores.
 */
@Injectable()
export class AdminsService {
  /**
   * Inyecta el repositorio de TypeORM para la entidad Admin.
   * @param adminsRepository Repositorio de la entidad Admin.
   */
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}

  /**
   * Crea un nuevo administrador en la base de datos.
   * Verifica que no exista previamente un administrador con el mismo username.
   * @param createAdminDto Datos para crear el administrador.
   * @throws BadRequestException si ya existe un administrador con el username proporcionado.
   * @returns Promesa con el objeto Admin creado.
   */
  async create(createAdminDto: CreateAdminDto) {
    // Buscar si ya existe el username de administrador
    const existing = await this.adminsRepository.findOne({
      where: { username: createAdminDto.username },
    });
    if (existing) {
      throw new BadRequestException('Ya existe un administrador con ese username');
    }
    // TODO: Agregar el hasheo de la password y eliminar de la respuesta la contraseña
    return await this.adminsRepository.save(createAdminDto);
  }

  /**
   * Busca y obtiene un administrador por su adminId (UUID).
   * @param id Identificador único del administrador.
   * @throws NotFoundException si no se encuentra el administrador.
   * @returns Promesa con el objeto Admin encontrado.
   */
  async findOne(id: string) {
    const admin = await this.adminsRepository.findOne({
      where: { adminId: id },
    });
    if (!admin) throw new NotFoundException('Administrador no encontrado');
    return admin;
  }

  /**
   * Actualiza los datos de un administrador existente.
   * @param id Identificador único del administrador a actualizar.
   * @param updateAdminDto Datos a actualizar en el administrador.
   * @throws NotFoundException si el administrador no existe.
   * @returns Promesa con el objeto Admin actualizado.
   */
  async update(id: string, updateAdminDto: UpdateAdminDto) {
    await this.findOne(id);
    await this.adminsRepository.update({ adminId: id }, updateAdminDto);
    return this.findOne(id);
  }

  /**
   * Elimina un administrador de la base de datos por su adminId.
   * @param id Identificador único del administrador a eliminar.
   * @throws NotFoundException si el administrador no existe o no se eliminó correctamente.
   * @returns Promesa con un mensaje de éxito si se elimina correctamente.
   */
  async remove(id: string) {
    await this.findOne(id);
    await this.adminsRepository.delete({ adminId: id });

    // Verificar si realmente se eliminó
    const admin = await this.adminsRepository.findOne({ where: { adminId: id } });
    if (admin) {
      throw new NotFoundException('No se pudo eliminar el administrador');
    }
    return { message: 'Administrador eliminado correctamente.' };
  }
}
