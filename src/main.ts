import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: true,
  });
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('ComfyUI server API文档')
    .setDescription(
      '使用ComfyUI的工作流就像使用API一样简单！comfy-server是ComfyUI原生接口的服务端增强版本，可以将comfyUI强大的工作流转换为API供前端调用',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(new ConfigService().get('CONFIG_BASE_POST'));
}

bootstrap();
