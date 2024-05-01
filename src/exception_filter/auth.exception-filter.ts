import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
    UnauthorizedException,
    } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ErrorDto } from './errror.dto';
import { TokenExpiredException } from 'src/auth/exception/token-expired.exception';
import { RegistrationValidationException } from 'src/auth/exception/registration-validation.exception';
    
@Catch(UnauthorizedException , RegistrationValidationException)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    var errorDto : ErrorDto;

    if(exception instanceof RegistrationValidationException){
        errorDto = new ErrorDto(exception.message, "Registration Invailed" ,exception.getStatus());
    }
    else if(exception instanceof TokenExpiredException){
        errorDto = new ErrorDto(exception.message, "Token Expired" ,exception.getStatus());
    }
    else{
        errorDto = new ErrorDto(exception.message, "Unauthorized" ,exception.getStatus());
    }

    response.status(exception.getStatus()).json(errorDto);
        
    }
}