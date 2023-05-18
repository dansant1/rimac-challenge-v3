export interface IApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
}

export interface IPersonTranslator<T> {
    translate(person: T): T;
}

export interface ITranslatorFactory<T> {
    createTranslator(): IPersonTranslator<T>;
}

export interface IPerson {
    nombre: string;
    altura: string;
    peso: string;
    color_cabello: string;
    color_piel: string;
    color_ojos: string;
    anio_nacimiento: string;
    genero: string;
    planeta_natal: string;
    películas: string[];
    especies: string[];
    vehículos: string[];
    naves_estelares: string[];
    creado: string;
    editado: string;
    url: string;
}
