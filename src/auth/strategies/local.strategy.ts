/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userauthService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const auth = await this.userauthService.validateUser(email, password);
    if (!auth) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return auth;
  }
}
