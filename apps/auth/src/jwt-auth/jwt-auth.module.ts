import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtAuthController } from './jwt-auth.controller';
import { JwtAuthService } from './jwt-auth.service';
import { AuthGuard } from './jwt-auth.guards';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s'},
    }),
  ],
  controllers: [JwtAuthController],
  providers: [
    JwtAuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
