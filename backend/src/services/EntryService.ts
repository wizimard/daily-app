import { ObjectId } from "mongodb";

import EntryDto from "../dtos/EntryDto";

import ApiError from "../exceptions/ApiError";

import EntryModel from "../models/EntryModel";

import { deleteCandidates, deleteFile } from "./ImageService";

class EntryService {
    async getEntries(userId: string, page: number) {
        const entries = await EntryModel.find({
            author: new ObjectId(userId)
        }, null, {
            sort: { date: -1 },
            limit: 6,
            skip: 6 * page
        });

        const entriesDto: EntryDto[] = [];

        entries.forEach(entry => {
            entriesDto.push(new EntryDto(entry));
        });

        return entriesDto;
    }
    async getEntry(author: string, entryId: string) {
        const entry = await EntryModel.findById(entryId);        

        if (!entry || entry.author.toString() !== author) {
            throw ApiError.NotFound();
        }

        const entryDto = new EntryDto(entry);

        return entryDto;
    }
    async createEntry(author: string,
            title: string,
            content: string,
            date: string,
            images: string[],
            notes: string) {

                const entry = await EntryModel.create({
                    author: new ObjectId(author),
                    date: new Date(date),
                    title,
                    content,
                    images,
                    notes
                });

                images.forEach(image => {
                    deleteCandidates.delete(image);
                });

                const entryDto = new EntryDto(entry);

                return entryDto;
    }
    async updateEntry(id: string,
        author: string,
        title: string,
        content: string,
        date: string,
        images: string[],
        notes: string
    ) {

        const entry = await EntryModel.findOne({
            _id: id,
            author: new ObjectId(author)
        });

        if (!entry) throw ApiError.NotFound();

        const deleteImages = entry.images.filter(image => !images.includes(image));

        deleteImages.forEach(image => {
            deleteFile(image);
        });

        await entry.updateOne({
            _id: id,
            author: new ObjectId(author),
            title,
            content,
            date,
            images,
            notes
        }, {new: true});
        

        images.forEach(image => {
            deleteCandidates.delete(image);
        });

        await entry.save();

        const entryDto = new EntryDto(entry);

        return entryDto;
    }
    async deleteEntry(id: string, author: string) {

        const entry = await EntryModel.findOne({
            _id: id,
            author: new ObjectId(author)
        });

        if (!entry) throw ApiError.NotFound();

        entry.images.forEach(image => {
            deleteFile(image);
        });

        await entry.deleteOne();

        return true;
    }
}

export default new EntryService();