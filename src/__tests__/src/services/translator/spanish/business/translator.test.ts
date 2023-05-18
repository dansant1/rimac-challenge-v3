import { SpanishTranslator } from '../../../../../../services/translator/spanish/business/translator';

describe('SpanishTranslator', () => {
  let translator: SpanishTranslator<any>;

  beforeEach(() => {
    // Create a new instance of SpanishTranslator before each test
    translator = new SpanishTranslator({
      name: 'nombre',
      height: 'altura',
      mass: 'masa',
    });
  });

  describe('translate', () => {
    it('should translate the keys in the provided JSON object', () => {
      const mockJson = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hairColor: 'blond',
      };

      const result = translator.translate(mockJson);

      expect(result).toEqual({
        nombre: 'Luke Skywalker',
        altura: '172',
        masa: '77',
        hairColor: 'blond',
      });
    });

    it('should preserve the values of non-translated keys', () => {
      const mockJson = {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        eyeColor: 'brown',
      };

      const result = translator.translate(mockJson);

      expect(result).toEqual({
        nombre: 'Leia Organa',
        altura: '150',
        masa: '49',
        eyeColor: 'brown',
      });
    });
  });

  describe('_translateKey', () => {
    it('should return the translated key if available', () => {
      const translatedKey = translator['_translateKey']('name');

      expect(translatedKey).toBe('nombre');
    });

    it('should return the original key if no translation is available', () => {
      const originalKey = translator['_translateKey']('age');

      expect(originalKey).toBe('age');
    });
  });
});
