import {EntityRepository, Repository} from "typeorm";
import {Task} from "./task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatus} from "./task.model";
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import {User} from "../auth/user.entity";

@EntityRepository(Task)
export class TaskReponsitory extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto;
        const task= new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN
        await task.save();

        return task;
    }

    async getTasks(filterDTO: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id});

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        return await query.getMany();
    }
}