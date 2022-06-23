import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IComment, ITask } from "../../models/ITask"

interface TaskState {
    tasks: ITask[];
    activeTask: ITask | null;
    isLoading: boolean;
    error: string;
    isChanged: boolean;
    isAllFetching: boolean;
}
const initialState: TaskState = {
    tasks: [],
    activeTask: null,
    isLoading: false,
    error: "",
    isChanged: false,
    isAllFetching: false
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        taskFetching(state) {
            state.isLoading = true;
        },
        taskFetchingSucces(state, action: PayloadAction<ITask[]>) {
            state.isLoading = false;
            state.error = "";

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
        taskFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setActiveTask(state, action: PayloadAction<string>) {
            state.isChanged = false;

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
                state.activeTask.date_start = action.payload;

                state.isChanged = true;
            }
        },
        changeTaskDateEnd(state, action: PayloadAction<string>) {
            if (state.activeTask) {
                state.activeTask.date_end = action.payload;

                state.isChanged = true;
            }
        },
        addTaskComment(state, action: PayloadAction<IComment>) {
            if (state.activeTask) {
                state.activeTask.comments = [...state.activeTask.comments, action.payload];

                state.isChanged = true;
            }
        },
        deleteTaskComment(state, action: PayloadAction<string>) {
            if (state.activeTask) {
                state.activeTask.comments = state.activeTask.comments.filter(
                    comment => comment.id !== action.payload
                );

                state.isChanged = true;
            }
        }
    }
})