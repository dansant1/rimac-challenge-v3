export class SWAPIServiceError extends Error {
    constructor(message?: string) {
      super(message || 'SWAPI Service Error');
      this.name = 'SWAPIServiceError';
    }
}