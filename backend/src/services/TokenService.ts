import jwt from 'jsonwebtoken';

import TokenModel from '../models/TokenModel';

import UserDto from '../dtos/UserDto';

import { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from '../constants';

class TokenService {
    generateTokens(payload: UserDto) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
            expiresIn: '30m'
        });
        
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
            expiresIn: '30d'
        });

        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(accessToken: string) {
        try {
            const userData = <jwt.UserIDJwtPayload>jwt.verify(accessToken, JWT_ACCESS_SECRET_KEY);

            return userData;
        } catch(e) {
            return null;
        }
    }
    validateRefreshToken(refreshToken: string) {
        try {
            const userData = <jwt.UserIDJwtPayload>jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);
            
            return userData;
        } catch(e) {
            return null;
        }
    }
    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenModel.findOne({
            user: userId
        });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({
            user: userId,
            refreshToken
        });
        
        return token;
    }
    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({
            refreshToken
        });

        const deleteData = await TokenModel.deleteOne({ refreshToken });
        console.log('delete data');
        console.log(deleteData);
        

        return tokenData;
    }
    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({
            refreshToken
        });        

        return tokenData;
    }
}

export default new TokenService();