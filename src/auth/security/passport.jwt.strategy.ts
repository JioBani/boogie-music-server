import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Payload } from "./payload.interface";
import { User } from "src/domain/user.entity";
import { TokenExpiredException } from "../exception/token-expired.exception";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'JWT_SECRET'
        })
    }

    async validate(payload: Payload, done: VerifiedCallback): Promise<User | any> {
        const user = await this.authService.isUserExist(payload);

        if(!user) {
            throw new UnauthorizedException({
                message: 'user does not exist',
                error : 'Unauthorized',
                statusCode : 401,
            });
        }

        const currentTime = Math.floor(Date.now() / 1000);
        console.log(payload.exp);

        if (payload.exp == undefined || payload.exp < currentTime) {
            throw new TokenExpiredException();
        }
       
        return user;
    }
}