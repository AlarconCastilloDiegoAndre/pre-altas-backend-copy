import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TOKEN_NAME } from './auth/constants/jwt.constants';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookies
  // TODO: Acabar de implementar las cookies
  app.use(cookieParser());

  //Validacion de los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true, // Detenerse en el primer error de validación
      whitelist: true, // Elimina propiedades no declaradas en el DTO.
      forbidNonWhitelisted: true, // Lanza error si el usuario manda propiedades que no están en el DTO.
      transform: true, // Transformar los datos de entrada a los tipos esperados
    }),
  );

  // Hobilitar CORS para todas las rutas
  app.enableCors({
    origin: process.env.URL_FRONT, // Permitir todas las solicitudes de origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept', // Encabezados permitidos
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Pre-altas backend')
    .setDescription('API para la pre-altas de materias')
    .setVersion('1.0')
    .addCookieAuth(TOKEN_NAME)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      operationsSorter: 'alpha', // Ordena los endpoints alfabéticamente
      tagsSorter: 'alpha',       // Ordena los tags alfabéticamente
    },
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server started on port ${process.env.PORT}`);
  console.log(`Front URL ${process.env.URL_FRONT}`);
}
bootstrap();
