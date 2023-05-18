
import {
    IPersonTranslator,
    ITranslatorFactory,
} from '../../contract';
import {
    translationMap,
} from '../../utils';
import {
    SpanishTranslator,
} from '../business';

export class SpanishTranslatorFactory<T> implements ITranslatorFactory<T> {
    createTranslator(): IPersonTranslator<T> {
      return new SpanishTranslator(translationMap.spanish);
    }
}