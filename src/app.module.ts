import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsModule } from './subjects/subjects.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { PeriodsModule } from './periods/periods.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    SubjectsModule,
    StudentsModule,
    PeriodsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
