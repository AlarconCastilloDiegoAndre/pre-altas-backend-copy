import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches, IsDateString, IsBoolean } from 'class-validator';

export class UpdatePeriodDto {
  @ApiPropertyOptional({
    description: 'ID único del periodo en formato AÑO-MES_INICIO-MES_FIN (ej: 2025-ENE-JUN).',
    example: '2025-ENE-JUN',
    minLength: 11,
    maxLength: 11,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'El id del periodo debe ser un texto' })
  @Length(11, 11, { message: 'El id del periodo debe tener exactamente 11 caracteres' })
  @Matches(/^\d{4}-[A-Z]{3}-[A-Z]{3}$/, { message: 'El id del periodo debe tener el formato AÑO-MES_INICIO-MES_FIN, por ejemplo 2025-ENE-JUN' })
  periodId?: string;

  @ApiPropertyOptional({
    description: 'Fecha de inicio del periodo en formato YYYY-MM-DD.',
    example: '2025-01-01',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe tener formato válido YYYY-MM-DD' })
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Fecha de fin del periodo en formato YYYY-MM-DD.',
    example: '2025-06-30',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe tener formato válido YYYY-MM-DD' })
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Indica si el periodo está activo.',
    type: Boolean,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser booleano' })
  active?: boolean;
}