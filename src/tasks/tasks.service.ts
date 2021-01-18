import {CreateTaskDto} from './dto/create-task.dto';
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TaskReponsitory} from "./task.reponsitory";
import {Task} from './task.entity';
import {TaskStatus} from "./task.model";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskReponsitory)
        private taskReponsitory: TaskReponsitory
    ) {}

    // private tasks: Task[] = [];
    //
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    //
    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);
    //
    //     if (!found) {
    //         throw new NotFoundException();
    //     }
    //
    //     return found;
    // }
    //
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
