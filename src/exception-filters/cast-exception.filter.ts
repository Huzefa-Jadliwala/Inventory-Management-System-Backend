// cast-exception.filter.ts

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';

@Catch()
export class CastExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    if (exception.name === 'CastError') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      // Handle the CastError as per your requirements
      response.status(400).json({
        message: 'Invalid ObjectId',
        error: 'Bad Request',
      });
    }
  }
}
