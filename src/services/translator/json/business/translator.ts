import {
    IPersonTranslator,
    ITranslatorFactory,
    IApiResponse,
} from '../../contract';  

export class JsonTranslator<T> {

    constructor(
        protected translatorFactory: ITranslatorFactory<T>
    ) {}

    translate(data: IApiResponse): IApiResponse {
      const translator: IPersonTranslator<T> = this.translatorFactory
      .createTranslator();
      const translatedResults: T[] = data
      .results
      .map((person) => translator.translate(person));
      return {
        count: data?.count,
        next: data?.next,
        previous: data?.previous,
        results: translatedResults,
      };
    }
}
  