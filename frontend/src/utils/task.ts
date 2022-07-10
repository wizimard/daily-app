import { ITodo } from "../models/ITask";

export function getTaskStatus(date_start: string, date_end: string, todos: ITodo[]) {    
    let allToDo = 0;
    let doneToDo = 0;

    const stack = [];

    for (let todo of todos) {
        stack.push(todo);
    }

    while (stack.length > 0) {
        let todo = stack.pop();

        if (todo?.todos) {
            todo.todos.forEach((todo) => {
                stack.push(todo);
            });
        }

        if (todo?.isDone) doneToDo++;

        allToDo++;
    }
    const dateNow = new Date();
    const dateEnd = new Date(date_end);

    let status;

    if (dateNow > dateEnd) status = 'critical';
    
    return {
        done: `${doneToDo}/${allToDo}`,
        status
    }
}