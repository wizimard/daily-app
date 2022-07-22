import { v4 } from 'uuid';
import { ObjectId } from "mongodb";

import TaskDto from "../dtos/TaskDto";

import TaskModel, { ITodo } from "../models/TaskModel";

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
        todos: ITodo[]) {

            const filterTodos = this.clearTrashTodos(todos);
            
            const task = await TaskModel.create({
                author: new ObjectId(userId),
                date_start: new Date(date_start),
                date_end: new Date(date_end),
                title,
                description,
                todos: filterTodos.map(todo => ({ ...todo, id: v4()}))
            });

            const taskDto = new TaskDto(task);

            return taskDto;
    }
    async getTask(userId: string, id: string) {
        const task = await TaskModel.findOne({
            _id: id,
            author: new ObjectId(userId)
        });

        if (!task) {
            throw ApiError.NotFound();
        }

        const taskDto = new TaskDto(task);

        return taskDto;
    }
    async updateTask(userId: string,
        id: string,
        date_start: string,
        date_end: string,
        title: string,
        description: string,
        todos: ITodo[]) {

            const filterTodos = this.clearTrashTodos(todos);

            const task = await TaskModel.findOneAndUpdate({
                _id: id,
                author: new ObjectId(userId)
            }, {
                date_start: new Date(date_start),
                date_end: new Date(date_end),
                title,
                description,
                todos: filterTodos.map(todo => ({ ...todo, id: v4()}))
            }, {new: true});
            
            if (!task) {
                throw ApiError.NotFound();
            }

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
    clearTrashTodos(todos: ITodo[], deepLevel: number = 0) {
        if (deepLevel >= 4) return [];

        const result: ITodo[] = [];
        
        for (let todo of todos) {
            if (!todo.content) continue;

            todo.todos = this.clearTrashTodos(todo.todos || [], deepLevel + 1);

            result.push(todo);
        }

        return result;
    }
}

export default new TaskService();