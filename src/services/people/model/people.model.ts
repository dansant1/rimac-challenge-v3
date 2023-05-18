import { DataTypes } from 'sequelize';
import { db as sequelize } from '../../../config'; // Assuming you have a Sequelize instance set up

export interface PersonAttributes {
  nombre: string;
  altura: string;
  masa: string;
  color_del_cabello: string;
  color_de_piel: string;
  color_de_ojos: string;
  anio_de_nacimiento: string;
  genero: string;
  planeta_natal: string;
  peliculas: string[];
  especies: string[];
  vehiculos: string[];
  naves_estelares: string[];
  creado: string;
  editado: string;
  URL: string;
  createdAt: Date,
  updatedAt: Date,
}

export const Person = sequelize.define('people', {
        nombre: {
            type: DataTypes.STRING
        },
        altura: {
            type: DataTypes.STRING,
        },
        masa: {
            type: DataTypes.STRING
        },
        color_del_cabello: {
            type: DataTypes.STRING,
        },
        color_de_piel: {
            type: DataTypes.STRING,
        },
        color_de_ojos: {
            type: DataTypes.STRING,
        },
        anio_de_nacimiento: {
            type: DataTypes.STRING,
        },
        genero: {
            type: DataTypes.STRING,
        },
        planeta_natal: {
            type: DataTypes.STRING,
        },
        peliculas: {
            type: DataTypes.JSON(),
        },
        especies:{
            type: DataTypes.JSON(),
        },
        vehiculos: {
            type: DataTypes.JSON(),
        },
        naves_estelares: {
            type: DataTypes.JSON(),
        },
        creado: {
            type: DataTypes.STRING,
        },
        editado: {
            type: DataTypes.STRING,
        },
        URL: {
            type: DataTypes.STRING,
        },
})

