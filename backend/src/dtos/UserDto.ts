export default class UserDto {
    id;
    email;
    username;
    avatar;
    isActivated;

    constructor(model: any) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.username = model.username;
        this.avatar = model.avatar;
    }
}