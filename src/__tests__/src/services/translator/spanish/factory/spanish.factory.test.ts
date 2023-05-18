import { 
    SpanishTranslatorFactory 
} from '../../../../../../services/translator/spanish/factory/spanish.factory';
import { SpanishTranslator } from '../../../../../../services/translator/spanish/business/translator';

describe('SpanishTranslatorFactory', () => {
  let factory: SpanishTranslatorFactory<any>;

  beforeEach(() => {
    factory = new SpanishTranslatorFactory();
  });

  describe('createTranslator', () => {
    it('should create an instance of SpanishTranslator', () => {
      const translator = factory.createTranslator();

      expect(translator).toBeInstanceOf(SpanishTranslator);
    });
  });
});
