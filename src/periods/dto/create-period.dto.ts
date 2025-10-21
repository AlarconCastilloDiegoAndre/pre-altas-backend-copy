import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePeriodDto {
  @ApiProperty({
    description: 'ID único del periodo en formato AÑO-MES_INICIO-MES_FIN (ej: 2025-ENE-JUN).',
    example: '2025-ENE-JUN',
    minLength: 11,
    maxLength: 11,
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El id del periodo es un campo requerido' })
  @IsString({ message: 'El id del periodo debe ser un texto' })
  @Length(12, 12, { message: 'El id del periodo debe tener exactamente 12 caracteres' })
  @Matches(/^\d{4}-[A-Z]{3}-[A-Z]{3}$/, { message: 'El id del periodo debe tener el formato AÑO-MES_INICIO-MES_FIN, por ejemplo 2025-ENE-JUN' })
  periodId: string;

  @ApiProperty({
    description: 'Fecha de inicio del periodo en formato YYYY-MM-DD.',
    example: '2025-01-01',
    type: String,
    format: 'date',
    required: true,
  })
  @IsNotEmpty({ message: 'La fecha de inicio es un campo requerido' })
  @IsDateString({}, { message: 'La fecha de inicio debe tener formato válido YYYY-MM-DD' })
  startDate: string;

  @ApiProperty({
    description: 'Fecha de fin del periodo en formato YYYY-MM-DD.',
    example: '2025-06-30',
    type: String,
    format: 'date',
    required: true,
  })
  @IsNotEmpty({ message: 'La fecha de fin es un campo requerido' })
  @IsDateString({}, { message: 'La fecha de fin debe tener formato válido YYYY-MM-DD' })
  endDate: string;

  @ApiProperty({
    description: 'Indica si el periodo está activo.',
    type: Boolean,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser booleano' })
  active?: boolean = false;
}