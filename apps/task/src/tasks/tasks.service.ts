import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './interfaces/create-task-dto.interface';
import { UpdateTaskDto } from './interfaces/update-task-dto.interface';
import { AuthService, LoginResponse, ValidateTokenResponse } from './interfaces/auth.interface';
import { Task } from './entities/task.entity';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class TasksService {
  private authService: AuthService;

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @Inject('AUTH_PACKAGE') private readonly client: ClientGrpc
    
  ){}


  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  async create(createTaskDto: CreateTaskDto, token: string): Promise<Task> {
    const validationResponse = await this.authService.validateToken({ token }).toPromise();
    
    if (!validationResponse.isValid) {
      throw new UnauthorizedException('Invalid token');
    }
    
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = false;
    task.userId = createTaskDto.userId;

    return this.tasksRepository.save(task);
  }

  async findAll(userId: number, token:string): Promise<Task[]> {
    const validationResponse = await this.authService.validateToken({ token }).toPromise();
    
    if (!validationResponse.isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.tasksRepository.findBy({userId: userId});
  }

  async findOne(id: number, token: string) {
    const validationResponse = this.authService.validateToken({ token }).toPromise();
    
    if (!(await validationResponse).isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.tasksRepository.findOneBy({id: id});
  }

  async update(updateTaskDto: UpdateTaskDto, token:string) {
    const validationResponse = this.authService.validateToken({ token }).toPromise();
    
    if (!(await validationResponse).isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    const task = this.findOne(updateTaskDto.id, token);
    Object.assign(task, updateTaskDto);
    return task;
  }

  async remove(id: number, token: string) {
    const validationResponse = await this.authService.validateToken({ token }).toPromise();
    
    if (!validationResponse.isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    await this.tasksRepository.delete(id);
  }
}
