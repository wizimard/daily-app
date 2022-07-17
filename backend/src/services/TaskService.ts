import { v4 } from 'uuid';
import { ObjectId } from "mongodb";

import TaskDto from "../dtos/TaskDto";

import TaskModel from "../models/TaskModel";

import ApiError from '../exceptions/ApiError';

class TaskService {
    async getTasks(userId: string) {
        const tasks = await TaskModel.find({
            author: userId
        }, null, {
            sort: {
                'date_start': 1
            }
        });
        const tasksDto: TaskDto[] = [];

        tasks.forEach(task => {
            tasksDto.push(new TaskDto(task));
        });

        return tasksDto;
    }
    async createTask(userId: string,
        date_start: string,
        date_end: string,
        title: string,
        description: string,
        todos: any[]) {
            
            const task = await TaskModel.create({
                author: new ObjectId(userId),
                date_start: new Date(date_start),
                date_end: new Date(date_end),
                title,
                description,
                todos: todos.map(todo => ({ ...todo, id: v4()}))
            });

            const taskDto = new TaskDto(task);

            return taskDto;
    }
    async getTask(userId: string, id: string) {
        const task = await TaskModel.findOne({
            _id: id,
            author: new ObjectId(userId)
        });

        const taskDto = new TaskDto(task);

        return taskDto;
    }
    async updateTask(userId: string,
        id: string,
        date_start: string,
        date_end: string,
        title: string,
        description: string,
        todos: any[]) {

            const task = await TaskModel.findOneAndUpdate({
                _id: id,
                author: new ObjectId(userId)
            }, {
                date_start: new Date(date_start),
                date_end: new Date(date_end),
                title,
                description,
                todos: todos.map(todo => ({ ...todo, id: v4()}))
            }, {new: true});

            const taskDto = new TaskDto(task);

            return taskDto;
    }
    async deleteTask(userId: string, id: string) {
        const deleteData = await TaskModel.deleteOne({
            _id: id,
            author: new ObjectId(userId)
        });

        if (deleteData.deletedCount === 0) throw ApiError.NotFound();

        return true;
    }
}

export default new TaskService();