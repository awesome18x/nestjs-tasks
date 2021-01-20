import {CreateTaskDto} from './dto/create-task.dto';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TaskReponsitory} from "./task.reponsitory";
import {Task} from './task.entity';
import {TaskStatus} from "./task.model";
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskReponsitory)
        private taskReponsitory: TaskReponsitory
    ) {}

    async getTasks(filterDTO: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskReponsitory.getTasks(filterDTO, user);
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskReponsitory.createTask(createTaskDto);
    }

    async deleteTask(id: string): Promise<void> {
        const result  =  await this.taskReponsitory.delete(id);
        console.log(result);
        if (result.affected === 0) {
            throw new NotFoundException('Khong xoa duoc task nao ca.');
        }
    }

    async updateTask(id: string, taskStatus: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = taskStatus;
        await task.save();
        return task;

    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskReponsitory.findOne(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }
}
