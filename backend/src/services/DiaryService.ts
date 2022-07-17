import { ObjectId } from "mongodb";

import EntryDto from "../dtos/EntryDto";

import ApiError from "../exceptions/ApiError";

import EntryModel from "../models/EntryModel";

class DiaryService {
    async getEntries(userId: string) {
        const entries = await EntryModel.find({
            author: new ObjectId(userId)
        }, null, { sort: { date: -1 }});

        const entriesDto: EntryDto[] = [];

        entries.forEach(entry => {
            entriesDto.push(new EntryDto(entry));
        });

        return entriesDto;
    }
    async getEntry(author: string, entryId: string) {
        const entry = await EntryModel.findById(entryId);        

        if (!entry || entry.author._id.toString() !== author) {
            throw ApiError.NotFound();
        }

        const entryDto = new EntryDto(entry);

        return entryDto;
    }
    async createEntry(author: string,
            title: string,
            content: string,
            date: string,
            images: any[],
            notes: string) {

                const entry = await EntryModel.create({
                    author: new ObjectId(author),
                    date: new Date(date),
                    title,
                    content,
                    images,
                    notes
                });

                const entryDto = new EntryDto(entry);

                return entryDto;
    }
    async updateEntry(id: string,
        author: string,
        title: string,
        content: string,
        date: string,
        images: any[],
        notes: string
    ) {  
        
        const entry = await EntryModel.findOneAndUpdate({
            _id: id,
            author: new ObjectId(author)
        }, {
            title,
            content,
            date,
            images,
            notes
        }, {new: true});

        if (!entry) throw ApiError.NotFound();

        const entryDto = new EntryDto(entry);

        return entryDto;
    }
    async deleteEntry(id: string, author: string) {
        const deleteData = await EntryModel.deleteOne({
            _id: id,
            author: new ObjectId(author)
        });        

        if (deleteData.deletedCount === 0) throw ApiError.NotFound();

        return true;
    }
}

export default new DiaryService();