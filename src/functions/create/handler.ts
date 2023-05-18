
import type { Handler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import {
  SpanishTranslatorFactory,
  JsonTranslator,
  SWAPIService,
  PeopleService,
  PersonAttributes,
  DatabaseConnectionError,
  CreatePeopleError
} from '../../services';
import { db } from '../../config';

export const main: Handler = async () => {
  try {
    const swapi = SWAPIService.create();
    const data = await swapi.getPeople();
    const spanish = new SpanishTranslatorFactory();
    const tranlator = new JsonTranslator(spanish);
    const translated = tranlator.translate(data);
    const result = translated.results as PersonAttributes[];
    const peopleService = PeopleService.create(db);
    await peopleService.createPeople(result);
    return formatJSONResponse({
      message: 'success',
      result,
    });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return formatJSONResponse({
        message: 'DB connection failed',
      });
    }
    if (error instanceof CreatePeopleError) {
      return formatJSONResponse({
        message: 'it can not create the people data',
      });
    }
    return formatJSONResponse({
      message: error.message,
    });
  }
  
};

