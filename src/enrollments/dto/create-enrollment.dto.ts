import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export enum EnrollmentStateDto {
  BORRADOR = 'BORRADOR',
  CONFIRMADA = 'CONFIRMADA',
  BLOQUEADA = 'BLOQUEADA',
}

export class CreateEnrollmentDto {
  @ApiProperty({ example: 1, description: 'ID del alumno (students.student_id)' })
  @IsInt()
  @Min(1)
  studentId!: number;

  @ApiProperty({ example: 10, description: 'ID relación carrera-materia (career_subject.career_subject_id)' })
  @IsInt()
  @Min(1)
  careerSubjectId!: number;

  @ApiProperty({ example: '2025-ENE-JUN', description: 'Periodo académico (periods.period_id)' })
  @IsString()
  @Length(1, 20)
  periodId!: string;

  @ApiPropertyOptional({
    enum: EnrollmentStateDto,
    example: EnrollmentStateDto.BORRADOR,
    description: 'Estado inicial (opcional). Default: BORRADOR',
  })
  @IsOptional()
  @IsEnum(EnrollmentStateDto)
  state?: EnrollmentStateDto;
}
