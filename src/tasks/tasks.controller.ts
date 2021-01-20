import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    UsePipes,
    ValidationPipe,
    ParseIntPipe, UseGuards
} from '@nestjs/common';
import {Task} from "./task.entity";
import { TaskStatus } from './task.model';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id')
    updateTask(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
        ) {
        return this.tasksService.updateTask(id, status);
    }
}
