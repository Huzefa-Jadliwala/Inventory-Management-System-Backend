import { HttpException, HttpStatus } from '@nestjs/common';

export const MongoDBErrorHandler = (error) => {
  if (error.code === 11000) {
    throw new HttpException(
      {
        status: HttpStatus.CONFLICT,
        error: error.message,
      },
      HttpStatus.CONFLICT,
    );
  }

  throw error;
};
