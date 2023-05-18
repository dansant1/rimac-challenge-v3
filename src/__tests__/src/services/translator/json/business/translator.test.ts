import {
    IPersonTranslator,
    ITranslatorFactory,
    IApiResponse,
} from '../../../../../../services/translator/contract/translator.contract';
import { JsonTranslator } from '../../../../../../services/translator/json/business/translator';
  
describe('JsonTranslator', () => {
    let translatorFactory: ITranslatorFactory<any>;
    let jsonTranslator: JsonTranslator<any>;
  
    beforeEach(() => {
      translatorFactory = {
        createTranslator: jest.fn(),
      };
      jsonTranslator = new JsonTranslator(translatorFactory);
    });
  
    describe('translate', () => {
      it('should translate the data using the provided translator', () => {
        const mockData: IApiResponse = {
          count: 2,
          next: 'https://swapi.py4e.com/api/people/?page=2',
          previous: null,
          results: [
            { name: 'person1' },
            { name: 'person2' },
          ],
        };
  
        const mockTranslator: IPersonTranslator<any> = {
          translate: jest.fn((person) => ({ translatedName: person.name })),
        };
  
        jest.spyOn(translatorFactory, 'createTranslator').mockReturnValueOnce(mockTranslator);
  
        const result = jsonTranslator.translate(mockData);
  
        expect(result).toEqual({
          count: 2,
          next: 'https://swapi.py4e.com/api/people/?page=2',
          previous: null,
          results: [
            { translatedName: 'person1' },
            { translatedName: 'person2' },
          ],
        });
        expect(translatorFactory.createTranslator).toHaveBeenCalledTimes(1);
        expect(mockTranslator.translate).toHaveBeenCalledTimes(2);
        expect(mockTranslator.translate).toHaveBeenCalledWith({ name: 'person1' });
        expect(mockTranslator.translate).toHaveBeenCalledWith({ name: 'person2' });
      });
    });
  });
  