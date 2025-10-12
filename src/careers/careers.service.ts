import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Career } from './entities/career.entity';
import { Repository } from 'typeorm';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

/**
 * Service encargado de manejar la lógica de negocio para la entidad Career (Carrera).
 * Proporciona métodos para crear, obtener, actualizar y eliminar carreras.
 */
@Injectable()
export class CareersService implements OnModuleInit {
  /**
   * Inyecta el repositorio de TypeORM para la entidad Career.
   * @param careersRepository Repositorio de la entidad Career.
   */
  constructor(
    @InjectRepository(Career)
    private readonly careersRepository: Repository<Career>,
  ) {}

  async onModuleInit() {}

  /**
   * Obtiene todas las carreras registradas en la base de datos.
   * @returns Promesa con un arreglo de objetos Career.
   */
  async findAll() {
    return await this.careersRepository.find();
  }

  /**
   * Crea una nueva carrera en la base de datos.
   * Verifica que no exista previamente una carrera con el mismo careerId.
   * @param createCareerDto Datos para crear la carrera.
   * @throws BadRequestException si ya existe una carrera con el careerId proporcionado.
   * @returns Promesa con el objeto Career creado.
   */
  async create(createCareerDto: CreateCareerDto) {
    // Buscar si ya existe el id de carrera
    const existing = await this.careersRepository.findOne({
      where: { careerId: createCareerDto.careerId },
    });
    if (existing) {
      throw new BadRequestException('Ya existe una carrera con ese id');
    }
    return await this.careersRepository.save(createCareerDto);
  }

  /**
   * Busca y obtiene una carrera por su careerId.
   * @param id Identificador único de la carrera.
   * @throws NotFoundException si no se encuentra la carrera.
   * @returns Promesa con el objeto Career encontrado.
   */
  async findOne(id: string) {
    const career = await this.careersRepository.findOne({
      where: { careerId: id },
    });
    if (!career) throw new NotFoundException('Carrera no encontrada');
    return career;
  }

  /**
   * Actualiza los datos de una carrera existente.
   * @param id Identificador único de la carrera a actualizar.
   * @param updateCareerDto Datos a actualizar en la carrera.
   * @throws NotFoundException si la carrera no existe.
   * @returns Promesa con el objeto Career actualizado.
   */
  async update(id: string, updateCareerDto: UpdateCareerDto) {
    await this.findOne(id);
    await this.careersRepository.update({ careerId: id }, updateCareerDto);
    return this.findOne(id);
  }

  /**
   * Elimina una carrera de la base de datos por su careerId.
   * @param id Identificador único de la carrera a eliminar.
   * @throws NotFoundException si la carrera no existe.
   * @returns Promesa que se resuelve al eliminar la carrera.
   */
  async remove(id: string) {
    await this.findOne(id);
    const deleteResult = await this.careersRepository.delete({ careerId: id });
    if (deleteResult.affected === 0) {
      throw new InternalServerErrorException(
        `No se pudo eliminar la carrera con ID "${id}"`,
      );
    }
    return { message: 'Carrera eliminada correctamente' };
  }
}
