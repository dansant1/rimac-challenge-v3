import axios from 'axios';

export class SWAPIService {
    static create(): SWAPIService {
        return new SWAPIService();
    }
    async getPeople() {
      try {
        const { data } = await axios.get('https://swapi.py4e.com/api/people');
        return data;
      } catch (error) {
        console.error('Error occurred making the request to people:', error);
        throw error;
      }
    }
}