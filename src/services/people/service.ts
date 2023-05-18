
import {
    PersonAttributes,
    Person,
} from './model';
import {
    DatabaseConnectionError,
    GetPeopleError,
    CreatePeopleError,
} from './error';

export class PeopleService {
    constructor(private db) {}

    static create(db): PeopleService {
        return new PeopleService(db);
    }

    private _mapToPeopleAttributes(data: PersonAttributes): PersonAttributes {
        return {
          nombre: data.nombre,
          altura: data.altura,
          masa: data.masa,
          color_del_cabello: data.color_del_cabello,
          color_de_piel: data.color_de_piel,
          color_de_ojos: data.color_de_ojos,
          anio_de_nacimiento: data.anio_de_nacimiento,
          genero: data.genero,
          planeta_natal: data.planeta_natal,
          peliculas: Object.values(data.peliculas),
          especies: Object.values(data.especies),
          vehiculos: Object.values(data.vehiculos),
          naves_estelares: Object.values(data.naves_estelares),
          creado: data.creado,
          editado: data.editado,
          URL: data.URL,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
    }

    async testConnection() {
        try {
            await this.db.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw new DatabaseConnectionError(`Unable to connect to the database: ${error.message}`);
        }
    }
      

    public async createPeople(peopleData: PersonAttributes[]): Promise<PersonAttributes[]> {
        try {
            const data: PersonAttributes[] = peopleData.map((element) => this._mapToPeopleAttributes(element));
            await this.testConnection();
            await Person.sync();
            //@ts-ignore
            Person.bulkCreate(data);
            return peopleData;
        } catch (error) {
            throw new CreatePeopleError(`Failed to create people: ${error.message}`);
        }
    }

    public async findPeople(): Promise<any[]> {
        try {
            await this.testConnection();
            return await Person.findAll();
        } catch (error) {
            throw new GetPeopleError(`Failed to get people: ${error.message}`);
        }
    }
}



