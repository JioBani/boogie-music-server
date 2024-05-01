import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export class RegistrationValidationException extends BadRequestException {
  constructor(errorDescription: string) {
    super(errorDescription);
  }
}
