import { IUser } from "../models/UserModel";

export default class UserDto {
    id;
    email;
    username;
    avatar;
    isConfirm;

    constructor(model: IUser) {
        this.id = model._id;
        this.email = model.email;
        this.isConfirm = model.isConfirm;
        this.username = model.username;
        this.avatar = model.avatar;
    }
}