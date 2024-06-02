import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from '../interfaces/create-user-dto.interface';
import { User } from '../interfaces/user.interface';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'Register')
  async createUser(data: CreateUserDto): Promise<User> {
    return this.usersService.create(data);
  }

  @GrpcMethod('UserService', 'findAll')
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @GrpcMethod('UserService', 'find')
  async findUserById(id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

}
