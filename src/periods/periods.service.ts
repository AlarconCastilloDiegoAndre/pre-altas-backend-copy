import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Period } from './entities/period.entity';

/**
 * Service encargado de manejar la lógica de negocio para la entidad Period.
 * Proporciona métodos para crear, obtener, actualizar y eliminar periodos.
 */
@Injectable()
export class PeriodsService {
  /**
   * Inyecta el repositorio de TypeORM para la entidad Period.
   * @param periodsRepository Repositorio de la entidad Period.
   */
  constructor(
    @InjectRepository(Period)
    private readonly periodsRepository: Repository<Period>,
  ) {}

  /**
   * Obtiene todos los periodos registrados en la base de datos.
   * @returns Promesa con un arreglo de objetos Period.
   */
  async findAll() {
    return await this.periodsRepository.find();
  }

  /**
   * Crea un nuevo periodo en la base de datos.
   * Verifica que no exista previamente un periodo con el mismo periodId.
   * @param createPeriodDto Datos para crear el periodo.
   * @throws BadRequestException si ya existe un periodo con el periodId proporcionado.
   * @returns Promesa con el objeto Period creado.
   */
  async create(createPeriodDto: CreatePeriodDto) {
    // Buscar si ya existe el id de periodo
    const existing = await this.periodsRepository.findOne({
      where: { periodId: createPeriodDto.periodId },
    });
    if (existing) {
      throw new BadRequestException('Ya existe un periodo con ese id');
    }
    return await this.periodsRepository.save(createPeriodDto);
  }

  /**
   * Busca y obtiene un periodo por su periodId.
   * @param id Identificador único del periodo.
   * @throws NotFoundException si no se encuentra el periodo.
   * @returns Promesa con el objeto Period encontrado.
   */
  async findOne(id: string) {
    const period = await this.periodsRepository.findOne({
      where: { periodId: id },
    });
    if (!period) throw new NotFoundException('Periodo no encontrado');
    return period;
  }

  /**
   * Actualiza los datos de un periodo existente.
   * @param id Identificador único del periodo a actualizar.
   * @param updatePeriodDto Datos a actualizar en el periodo.
   * @throws NotFoundException si el periodo no existe.
   * @returns Promesa con el objeto Period actualizado.
   */
  async update(id: string, updatePeriodDto: UpdatePeriodDto) {
    await this.findOne(id);
    await this.periodsRepository.update({ periodId: id }, updatePeriodDto);
    return this.findOne(id);
  }

  /**
   * Elimina un periodo de la base de datos por su periodId.
   * @param id Identificador único del periodo a eliminar.
   * @throws NotFoundException si el periodo no existe o no se eliminó correctamente.
   * @returns Promesa con un mensaje de éxito si se elimina correctamente.
   */
  async remove(id: string) {
    await this.findOne(id);
    await this.periodsRepository.delete({ periodId: id });

    // Verificar si realmente se eliminó
    const period = await this.periodsRepository.findOne({ where: { periodId: id } });
    if (period) {
      throw new NotFoundException('No se pudo eliminar el periodo');
    }
    return { message: 'Periodo eliminado correctamente.' };
  }
}
