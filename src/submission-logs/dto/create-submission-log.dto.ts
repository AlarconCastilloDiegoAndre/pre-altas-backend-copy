import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, Length, Min } from 'class-validator';

export enum SubmissionActionDto {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  CONFIRM = 'confirm',
  BLOCK = 'block',
}

export class CreateSubmissionLogDto {
  @ApiProperty({ format: 'uuid', description: 'Admin que ejecuta la acción' })
  @IsUUID()
  actorAdminId!: string;

  @ApiPropertyOptional({ description: 'Alumno afectado (si aplica)', example: 202312345 })
  @IsOptional()
  @IsInt()
  @Min(1)
  studentId?: number;

  @ApiProperty({ description: 'Entidad afectada. Para este feature: ENROLLMENTS', example: 'ENROLLMENTS' })
  @IsString()
  @Length(1, 32)
  entity!: string;

  @ApiProperty({ description: 'ID del registro afectado (enrollments.enrollment_id)', example: '1' })
  @IsString() // BIGINT → string en TS
  @Length(1, 30)
  entityId!: string;

  @ApiProperty({ enum: SubmissionActionDto, description: 'Acción realizada' })
  @IsEnum(SubmissionActionDto)
  action!: SubmissionActionDto;

  @ApiPropertyOptional({ description: 'Motivo del cambio', example: 'Corrección de periodo' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    description: 'Objeto con cambios (antes/después, campos tocados, etc.)',
    example: { from: { state: 'BORRADOR' }, to: { state: 'CONFIRMADA' } },
  })
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/ban-types
  changesJson?: object;
}
