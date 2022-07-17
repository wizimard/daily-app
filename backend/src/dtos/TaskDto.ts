export default class TaskDto {
    id;
    date_start;
    date_end;
    title;
    description;
    todos;
    status;

    constructor(model: any) {
        this.id = model._id;
        this.date_start = model.date_start;
        this.date_end = model.date_end;
        this.title = model.title;
        this.description = model.description;
        this.todos = model.todos;
        this.status = {
            status: 'critical',
            done: '1/3'
        };
    }
}