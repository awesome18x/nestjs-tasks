import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TaskReponsitory} from "./task.reponsitory";

@Module({
  imports: [
      TypeOrmModule.forFeature([TaskReponsitory])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
