
import type { Handler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import {
  SpanishTranslatorFactory,
  JsonTranslator,
  SWAPIService,
  PeopleService,
  PersonAttributes,
  DatabaseConnectionError,
  CreatePeopleError,
  SWAPIServiceError,
} from '../../services';
import {
  ErrorDictionary,
} from '../../utils';
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
      return formatJSONResponse(ErrorDictionary['0001']);
    }
    if (error instanceof CreatePeopleError) {
      return formatJSONResponse(ErrorDictionary['0002']);
    }
    if (error instanceof SWAPIServiceError) {
      return formatJSONResponse(ErrorDictionary['0003']);
    }
    return formatJSONResponse({
      message: error.message,
    });
  }
};

