export class DatabaseConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseConnectionError';
    }
}

export class CreatePeopleError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CreatePeopleError';
    }
}

export class GetPeopleError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GetPeopleError';
    }
}