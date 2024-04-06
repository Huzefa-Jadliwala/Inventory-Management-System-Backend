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

  throw new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error.message,
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
