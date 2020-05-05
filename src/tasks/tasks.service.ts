import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  getTasks(filterDto: GetTasksFilterDto) {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskById(id: number, status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    // équivalent à result.affected === 0 alors affiche msg d'erreur
    if (!result.affected) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
