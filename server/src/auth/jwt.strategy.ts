import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';
import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;

const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && req.headers.authorization) {
    token = req.cookies.token;
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload) {
    return this.authService.validate(payload);
  }
}
