import axios from 'axios';
import {
  SWAPIServiceError,
} from './error';
export class SWAPIService {
    static create(): SWAPIService {
        return new SWAPIService();
    }
    async getPeople() {
      try {
        const { data } = await axios.get(process.env.SWAPI_URL);
        return data;
      } catch (error) {
        console.error('Error occurred making the request to people:', error);
        throw new SWAPIServiceError('Failed to fetch people from SWAPI');
      }
    }
}