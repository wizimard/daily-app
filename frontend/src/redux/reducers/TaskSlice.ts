import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IComment, ITask, ITodo } from "../../models/ITask"

import { formatDate } from "../../utils/date";
import { generateId } from "../../utils/id";

interface TaskState {
    tasks: ITask[];
    activeTask: ITask | null;
    isChanged: boolean;
    isAllFetching: boolean;
}
const initialState: TaskState = {
    tasks: [],
    activeTask: null,
    isChanged: false,
    isAllFetching: false
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        taskFetchingSucces(state, action: PayloadAction<ITask[]>) {

            if (action.payload && action.payload.length > 0) {
                for (let task of state.tasks) {
                    if (task.id === action.payload[0].id) {
                        state.isAllFetching = true;
                        return;
                    }
                }
                state.tasks = state.tasks.concat(action.payload);
                return;
            }
            state.isAllFetching = true;
        },
        setActiveTask(state, action: PayloadAction<string>) {
            state.isChanged = false;

            if (action.payload === "new") {
                state.activeTask = {
                    id: 'new',
                    date_start: formatDate(),
                    date_end: formatDate(),
                    title: '',
                    description: '',
                    todos: [],
                    comments: [],
                    status: {
                        done: ''
                    }
                }
                return;
            }

            for (let task of state.tasks) {
                if (task.id === action.payload) {
                    state.activeTask = JSON.parse(JSON.stringify(task));
                    return;
                }
            }
        },
        clearActiveTask(state) {
            state.isChanged = false;

            state.activeTask = null;
        },
        changeTaskTitle(state, action: PayloadAction<string>) {
            if (state.activeTask) {
                state.activeTask.title = action.payload;

                state.isChanged = true;
            }
        },
        changeTaskDescription(state, action: PayloadAction<string>) {
            if (state.activeTask) {
                state.activeTask.description = action.payload;

                state.isChanged = true;
            }
        },
        changeTaskDateStart(state, action: PayloadAction<string>) {
            if (state.activeTask) {
                state.activeTask.date_start = formatDate(action.payload);

                state.isChanged = true;
            }
        },
        changeTaskDateEnd(state, action: PayloadAction<string>) {
            if (state.activeTask) {
                state.activeTask.date_end = formatDate(action.payload);

                state.isChanged = true;
            }
        },
        addTaskComment(state, action: PayloadAction<string>) {

            if (action.payload) {
                
                const comment: IComment = {
                    id: generateId(),
                    date: formatDate(),
                    content: action.payload,
                    author: 'maxim'
                }
    
                if (state.activeTask) {
                    state.activeTask.comments = [...state.activeTask.comments, comment];
    
                    state.isChanged = true;
                }
            }
        },
        deleteTaskComment(state, action: PayloadAction<string>) {
            if (state.activeTask) {
                state.activeTask.comments = state.activeTask.comments.filter(
                    comment => comment.id !== action.payload
                );

                state.isChanged = true;
            }
        },
        addTaskToDo(state, action: PayloadAction<string | null>) {
            if (state.activeTask) {
                const newTodo:ITodo = {
                    id: generateId(),
                    content: '',
                    todos: [],
                    isDone: false
                }

                state.isChanged = true;

                if (action.payload === null) {
                    state.activeTask.todos = [...state.activeTask.todos, newTodo];
                    return;
                }

                const addTodo = (todos: ITodo[]) => {
                    todos.forEach(todo => {
                        if (todo.id === action.payload) todo.todos = [...todo.todos, newTodo];
                        addTodo(todo.todos);
                    });
                }
                
                addTodo(state.activeTask.todos);
            }
        },
        deleteTaskTodo(state, action: PayloadAction<string>) {
            if (state.activeTask) {

                state.isChanged = true;

                const deleteTodo = (todos: ITodo[]) => {
                    todos.forEach(todo => {
                        todo.todos = todo.todos.filter(todo => todo.id !== action.payload);
                        deleteTodo(todo.todos);
                    });
                }
                
                for (let todo of state.activeTask.todos) {
                    if (todo.id === action.payload) {
                        state.activeTask.todos = state.activeTask.todos.filter(todo => todo.id !== action.payload);
                        return;
                    }
                }

                deleteTodo(state.activeTask.todos);
            }
        },
        changeStatusTaskTodo(state, action: PayloadAction<string>) {
            if (state.activeTask) {
                const changeStatusTodo = (todos: ITodo[]) => {
                    todos.forEach(todo => {
                        if (todo.id === action.payload) todo.isDone = !todo.isDone;
                        changeStatusTodo(todo.todos);
                    });
                }
                changeStatusTodo(state.activeTask.todos);

                state.isChanged = true;
            }
        },
        changeContentTaskTodo(state, action: PayloadAction<{
            id: string,
            content: string
        }>) {
            if (state.activeTask) {
                const changeContentTodo = (todos: ITodo[]) => {
                    todos.forEach(todo => {
                        if (todo.id === action.payload.id) todo.content = action.payload.content;
                        changeContentTodo(todo.todos);
                    });
                }
                changeContentTodo(state.activeTask.todos);

                state.isChanged = true;
            }
        },
        addTask(state, action: PayloadAction<ITask>) {
            state.tasks = [...state.tasks, action.payload];
        },
        saveTask(state, action: PayloadAction<ITask>) {
            state.isChanged = false;

            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].id === action.payload.id) {
                    state.tasks[i] = action.payload;
                    
                    return;
                }
            }
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);

            state.isChanged = false;
        }
    }
});

export const {
    taskFetchingSucces,
    setActiveTask,
    clearActiveTask,
    changeTaskTitle,
    changeTaskDescription,
    changeTaskDateStart,
    changeTaskDateEnd,
    addTaskComment,
    deleteTaskComment,
    addTaskToDo,
    deleteTaskTodo,
    changeStatusTaskTodo,
    changeContentTaskTodo,
    addTask,
    saveTask,
    deleteTask
} = taskSlice.actions;

export default taskSlice.reducer;