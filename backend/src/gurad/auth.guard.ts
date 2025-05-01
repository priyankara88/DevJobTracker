import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtservice: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extracttokenfromheader(request);
    if (!token) {
      throw new UnauthorizedException('Not a valid token');
    }
    try {
      console.log(40, 'test');

      const payload = await this.jwtservice.verifyAsync(token);
      request['userid'] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('permission denied');
    }

    return true;
  }

  private extracttokenfromheader(request: Request): string | undefined {
    const r = request.headers.authorization?.split(' ')[1];
    return r;
  }
}
