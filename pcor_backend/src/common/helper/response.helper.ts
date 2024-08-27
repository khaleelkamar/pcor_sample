import { HttpStatus, HttpException } from '@nestjs/common';
import { MESSAGES as CommonMessages } from '../messages/en/common.messages';
export const handleException = (error: any) => {
  throw new HttpException(
    {
      statusCode:
        !!error?.response?.statusCode &&
        error?.response?.statusCode !== 500 &&
        error?.response?.statusCode !== 502
          ? error?.response?.statusCode
          : HttpStatus.INTERNAL_SERVER_ERROR,
      error:
        !!error?.response?.statusCode &&
        error?.response?.statusCode !== 500 &&
        error?.response?.statusCode !== 502
          ? error.message
          : CommonMessages.technicalError,
      message: error.message,
      Data: [],
    },
    !!error?.response?.statusCode &&
    error?.response?.statusCode !== 500 &&
    error?.response?.statusCode !== 502
      ? error?.response?.statusCode
      : HttpStatus.INTERNAL_SERVER_ERROR,
  );
};

export const handleErrors = (error: any, msg: string) => {
  throw new HttpException(
    {
      statusCode: Number(error),
      message: msg,
      error: msg,
      Data: [],
    },
    Number(CommonMessages.successStatusCode),
  );
};
