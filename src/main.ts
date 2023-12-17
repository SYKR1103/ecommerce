import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseAPIDocument } from './config/swagger.document';
import { SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService : ConfigService = app.get(ConfigService)

  // 왜하는지
  app.enableCors();
  app.setGlobalPrefix("api")


  //app.useGlobalPipes(new ValidationPipe({skipMissingProperties:true}))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalInterceptors(new TransformInterceptor())

  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get('SERVER_PORT') ?? 3000;

  await app.listen(port);
}
bootstrap();
