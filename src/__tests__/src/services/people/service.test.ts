import { Sequelize } from 'sequelize';
import {
  DatabaseConnectionError,
  PersonAttributes, 
  Person,
  PeopleService,
  GetPeopleError,
} from '../../../../services';

// Mock the Person model
jest.mock('../../../../services/people/model/people.model', () => ({
  Person: {
    sync: jest.fn(),
    bulkCreate: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe('PeopleService', () => {
  let db: Sequelize;
  let peopleService: PeopleService;

  beforeAll(() => {
    // Initialize the database connection
    db = new Sequelize(
      'database', 
      'username', 
      'password', {
        dialect: 'mysql',
    });
  });

  beforeEach(() => {
    // Reset mock function calls and create a new instance of PeopleService
    jest.clearAllMocks();
    peopleService = PeopleService.create(db);
  });

  describe('testConnection', () => {
    it('should log success message if the database connection is established', async () => {
      //@ts-ignore
      const authenticateSpy = jest.spyOn(db, 'authenticate').mockResolvedValueOnce(() => null);
      await peopleService.testConnection();
      expect(authenticateSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw DatabaseConnectionError if the database connection fails', async () => {
      const error = new Error('Database connection error');
      const authenticateSpy = jest.spyOn(db, 'authenticate').mockRejectedValueOnce(error);
      await expect(peopleService.testConnection()).rejects.toThrow(DatabaseConnectionError);
      expect(authenticateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createPeople', () => {
    it('should create people and return the input data', async () => {
      const peopleData: PersonAttributes[] = [
        {
          nombre: 'Luke Skywalker',
          altura: '172',
          masa: '77',
          color_del_cabello: '',
          color_de_piel: '',
          color_de_ojos: '',
          anio_de_nacimiento: '',
          genero: '',
          planeta_natal: '',
          peliculas: [''],
          especies: [''],
          vehiculos: [''],
          naves_estelares: [''],
          creado: '',
          editado: '',
          URL: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      //@ts-ignore
      const authenticateSpy = jest.spyOn(db, 'authenticate').mockResolvedValueOnce(() => null);
      jest.spyOn(Person, 'sync').mockImplementationOnce(() => null);
      jest.spyOn(Person, 'bulkCreate').mockImplementationOnce(() => null);
      const mapToPeopleAttributesSpy = jest.spyOn(peopleService as any, '_mapToPeopleAttributes');

      await expect(peopleService.createPeople(peopleData)).resolves.toEqual(peopleData);

      expect(authenticateSpy).toHaveBeenCalledTimes(1);
      expect(mapToPeopleAttributesSpy).toHaveBeenCalledTimes(peopleData.length);
      expect(Person.sync).toHaveBeenCalledTimes(1);
      expect(Person.bulkCreate).toHaveBeenCalledTimes(1);
      expect(Person.bulkCreate).toHaveBeenCalledWith(peopleData);
    });
  });

  describe('findPeople', () => {
    it('should return an array of people if the database connection is established', async () => {
      const peopleData: PersonAttributes[] = [
        {
          nombre: 'Luke Skywalker',
          altura: '172',
          masa: '77',
          color_del_cabello: '',
          color_de_piel: '',
          color_de_ojos: '',
          anio_de_nacimiento: '',
          genero: '',
          planeta_natal: '',
          peliculas: [''],
          especies: [''],
          vehiculos: [''],
          naves_estelares: [''],
          creado: '',
          editado: '',
          URL: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(peopleService, 'testConnection').mockResolvedValueOnce();
      //@ts-ignore
      jest.spyOn(Person, 'findAll').mockResolvedValueOnce(peopleData);

      const result = await peopleService.findPeople();

      expect(result).toEqual(peopleData);
      expect(peopleService.testConnection).toHaveBeenCalledTimes(1);
      expect(Person.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw GetPeopleError if an error occurs during retrieval', async () => {
      const error = new Error('Get people error');

      jest.spyOn(peopleService, 'testConnection').mockResolvedValueOnce();
      //@ts-ignore
      jest.spyOn(Person, 'findAll').mockRejectedValueOnce(error);

      await expect(peopleService.findPeople()).rejects.toThrow(GetPeopleError);
      expect(peopleService.testConnection).toHaveBeenCalledTimes(1);
      expect(Person.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
