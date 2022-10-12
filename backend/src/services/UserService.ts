import bcrypt from 'bcrypt';
import { v4 as uuid} from 'uuid';

import UserDto from '../dtos/UserDto';

import ApiError from '../exceptions/ApiError';

import UserModel from "../models/UserModel";

import MailService from './MailService';
import TokenService from './TokenService';

import { API_URL } from '../constants';

class UserService {
    async registration(email: string, password: string, username?: string) {
        const candidate = await UserModel.findOne({email});

        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} already exists`);
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const confirmLink = uuid();

        const user = await UserModel.create({
            email,
            password: hashPassword,
            username: username?.trim() || email,
            confirmLink
        });

        await MailService.sendConfirmMail(email, `${API_URL}/api/confirm/${confirmLink}`);

        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
    async confirm(confirmLink: string) {
        const user = await UserModel.findOne({ confirmLink });

        if (!user) {
            throw ApiError.BadRequest('Uncorrect confirmation link');
        }
        user.isConfirm = true;

        await user.save();
    }
    async login(email: string, password: string) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiError.BadRequest("User with this email is not found");
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            throw ApiError.BadRequest("Password is incorrect");
        }
        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken);

        return token;
    }
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(tokenFromDb.user);

        if (!user) throw ApiError.UnauthorizedError();

        const userDto = new UserDto(user);

        const tokens = await TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
}

export default new UserService();