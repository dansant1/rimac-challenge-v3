import { formatJSONResponse } from '@libs/api-gateway';
import type { Handler } from "aws-lambda"
import {
  PeopleService,
  GetPeopleError,
} from '../../services';
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
    if (error instanceof GetPeopleError) {
      return formatJSONResponse({
        message: 'it can not get the people data',
      });
    }
    return formatJSONResponse({
      message: error.message,
    });
  }
};