import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto} from './interfaces/create-task-dto.interface';
import { UpdateTaskDto } from './interfaces/update-task-dto.interface';
import { Task } from './interfaces/task.interface'; 
import { Tasks } from './interfaces/tasks.interface';
import { findOneRequest } from './interfaces/find-one-request.interface';
import { findAllRequest } from './interfaces/find-all-request.interface';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod('TaskService', 'CreateTask')
  async createTask(data: CreateTaskDto & { token: string }): Promise<Task> {
    return this.tasksService.create(data, data.token);
  }

  @GrpcMethod('TaskService', 'FindAllTask')
  async findAllTask(data: findAllRequest & { token: string }): Promise<Task[]> {
    return this.tasksService.findAll(data.userId, data.token);
  }

  @GrpcMethod('TaskService', 'FindOneTask')
  async findOneTask(data: findOneRequest & { token: string }): Promise<Task> {
    return this.tasksService.findOne(data.id, data.token);
  }

  @GrpcMethod('TaskService', 'UpdateTask')
  async updateTask(data: UpdateTaskDto & { token: string }): Promise<Task> {
    return this.tasksService.update(data, data.token);
  }

  @GrpcMethod('TaskService', 'RemoveTask')
  async removeTask(data: findOneRequest & { token: string }): Promise<void> {
    await this.tasksService.remove(data.id, data.token);
  }
}
