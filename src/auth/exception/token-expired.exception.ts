import { UnauthorizedException } from '@nestjs/common';

export class TokenExpiredException extends UnauthorizedException {
  constructor(errorDescription?: string) {
    super('Token expired', errorDescription || 'The access token has expired. Please refresh your token and try again.');
  }
}
