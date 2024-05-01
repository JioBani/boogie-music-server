import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Payload } from "./payload.interface";
import { AuthService } from "../auth.service";
import { Request } from "express";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "JWT_SECRET",
      passReqToCallback: true,
    });
  }

  async validate(req: Request,payload: Payload, done: VerifiedCallback) {
    console.log("validate")
    const refreshToken = req.get('authorization').split('Bearer ')[1];

    const user = await this.authService.checkRefreshToken(refreshToken , payload);

    if(!user) {
        throw new UnauthorizedException({
            message: 'user doew not exist',
            error : 'Unauthorized',
            statusCode : 401,
        });
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp == undefined || payload.exp < currentTime) {
        throw new UnauthorizedException({
            message: 'Token has expired',
            error : 'Expired',
            statusCode : 401,
        });
    }

    return this.authService.generateAcesssTokenWithRefreshToken(refreshToken , user)
  }
}