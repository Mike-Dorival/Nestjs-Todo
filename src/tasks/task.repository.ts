import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

// Repository sert à insérer, mettre à jour, supprimer... dans notre table via notre entity qui est Task
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder("task");

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      // Opérateur LIKE (SQL) permet de rechercher les enregistrements dont la valeur d’une colonne commence par telle ou telle lettre
      query.andWhere(
        "(task.title LIKE :search OR task.description Like :search)",
        { search }
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}
