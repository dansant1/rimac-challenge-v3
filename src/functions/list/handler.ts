import { formatJSONResponse } from '@libs/api-gateway';
import type { Handler } from "aws-lambda"
import {
  PeopleService,
  GetPeopleError,
  DatabaseConnectionError,
} from '../../services';
import {
  ErrorDictionary,
} from '../../utils';
import { db } from '../../config';

export const main: Handler = async () => {
  try {
    const peopleService = PeopleService.create(db);
    const result = await peopleService.findPeople();
    return formatJSONResponse({
      message: 'success',
      result,
    });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return formatJSONResponse(ErrorDictionary['0001']);
    }
    if (error instanceof GetPeopleError) {
      return formatJSONResponse(ErrorDictionary['0004']);
    }
    return formatJSONResponse({
      message: error.message,
    });
  }
};