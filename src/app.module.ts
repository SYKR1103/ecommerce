import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from '@hapi/joi';
import { AppConfigModule } from './config/config.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AppConfigModule,
    ProductModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
