
/**import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(3000);
}
bootstrap();
*/
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport : Transport.GRPC,
    options : {
      package : 'auth',
      protoPath : join(__dirname, '../proto/auth.proto')
    }
  });
  await app.listen();
}
bootstrap();
