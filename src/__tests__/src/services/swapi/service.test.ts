import axios from 'axios';
import { SWAPIService } from '../../../../services/swapi/service';

jest.mock('axios');

describe('SWAPIService', () => {
  let swapService: SWAPIService;

  beforeEach(() => {
    swapService = SWAPIService.create();
  });

  describe('getPeople', () => {
    it('should return data from the API', async () => {
      const mockData = { results: ['person1', 'person2'] };
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });

      const result = await swapService.getPeople();

      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
