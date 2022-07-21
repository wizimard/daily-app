import { IEntry } from "../models/EntryModel";

export default class EntryDto {
    id;
    date;
    title;
    content;
    images;
    notes;

    constructor(model: IEntry) {        
        this.id = model._id;
        this.date = model.date;
        this.title = model.title;
        this.content = model.content;
        this.images = model.images;
        this.notes = model.notes;
    }
}