import { Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstants } from "../constants";
import { AuthService } from "../auth.service";


@Injectable()
export class StudentStrategy extends PassportStrategy(Strategy, 'student') {
    constructor(private readonly userAuthService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:  jwtConstants.secret,
          });
    }

    async validate(payload: {id:string,email:string}) {
        const user = await this.userAuthService.validateJwtUser(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        if (user.role !== 'student') {
            throw new ForbiddenException('Permission denied');
        }
        return user;
    }
}