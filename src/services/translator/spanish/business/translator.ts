import {
    IPersonTranslator,
} from '../../contract';  

export class SpanishTranslator<T> implements IPersonTranslator<T> {
    constructor(
        protected translationMap: Record<string, string>
    ) {}

    translate(json: T): T {
      const translatedJson = {} as T;
      for (const key in json) {
        if (typeof json[key] === "object" && json[key] !== null) {
          //@ts-ignore  
          translatedJson[this._translateKey(key)] = this.translate(json[key]);
        } else {
          translatedJson[this._translateKey(key)] = json[key];
        }
      }
      return translatedJson;
    }

    private _translateKey(key: string): string {
        return this.translationMap[key] || key;
    }
}