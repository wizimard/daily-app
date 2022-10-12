import { ITask, ITodo } from "../models/TaskModel";

export default class TaskDto {
    id;
    date_start;
    date_end;
    title;
    description;
    todos;
    status;

    constructor(model: ITask) {
        this.id = model._id;
        this.date_start = model.date_start;
        this.date_end = model.date_end;
        this.title = model.title;
        this.description = model.description;
        this.todos = model.todos || [];
        this.status = this.getStatus(model.todos);
    }
    getStatus(todos: ITodo[]) {
        if (todos.length === 0) return '0/0';

        const stack = JSON.parse(JSON.stringify(todos));
        let countIsDone = 0;
        let countAll = 0;

        while (true) {
            const item = stack.shift();
            if (!item) break;

            const newTodos = item.todos ?? [];

            stack.push(...newTodos);

            countAll++;
            if (item.isDone) countIsDone++;
        }

        return `${countIsDone}/${countAll}`;
    }
}