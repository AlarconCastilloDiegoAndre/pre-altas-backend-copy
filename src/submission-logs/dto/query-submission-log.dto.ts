import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, Length, Min } from 'class-validator';
import { SubmissionActionDto } from './create-submission-log.dto';

export class QuerySubmissionLogDto {
  @ApiPropertyOptional({ description: 'Filtrar por admin (UUID)' })
  @IsOptional()
  @IsUUID()
  actorAdminId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por alumno' })
  @IsOptional()
  @IsInt()
  @Min(1)
  studentId?: number;

  @ApiPropertyOptional({ description: 'Entidad, ej: ENROLLMENTS', example: 'ENROLLMENTS' })
  @IsOptional()
  @IsString()
  @Length(1, 32)
  entity?: string;

  @ApiPropertyOptional({ description: 'ID del registro afectado' })
  @IsOptional()
  @IsString()
  @Length(1, 30)
  entityId?: string;

  @ApiPropertyOptional({ enum: SubmissionActionDto, description: 'Acción' })
  @IsOptional()
  @IsEnum(SubmissionActionDto)
  action?: SubmissionActionDto;
}
