import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { JwtAuthService } from './jwt-auth.service';
import { CreateUserDto } from '../interfaces/create-user-dto.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { ValidateTokenResponse } from '../interfaces/validate-token.interface';

@Controller()
export class JwtAuthController {
  constructor(private readonly authService: JwtAuthService) {}

  @GrpcMethod('AuthService', 'Login')
  async login(data: CreateUserDto): Promise<LoginResponse> {
    return this.authService.signIn(data.username, data.password);
  }

  @GrpcMethod('AuthService', 'ValidateToken')
  async validateToken(data: LoginResponse): Promise<ValidateTokenResponse> {
    return this.authService.validateToken(data.token);
  }
}
