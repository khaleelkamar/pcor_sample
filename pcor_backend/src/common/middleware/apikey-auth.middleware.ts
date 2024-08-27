import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ApiKeyAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (process.env.API_KEY != req.headers['api-key'])
      throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
    next();
  }
}
