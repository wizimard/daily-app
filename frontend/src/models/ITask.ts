export interface IComment {
    id: string;
    date: string;
    content: string;
    author: string;
}
export interface ITodo {
    id: string;
    content: string;
    tasks: ITodo[];
    isDone: boolean;
}
export interface ITask {
    id: string;
    date_start: string;
    date_end: string;
    title: string;
    description: string;
    comments: IComment[];
    tasks: ITodo[];
    status: {
        done: string;
        status?: string;
    };
}