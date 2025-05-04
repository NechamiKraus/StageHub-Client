
export class Director {

    name!: String;
    phone!: String;
    email!: String;
    password!: String;
    publicPassword!: String;
    list: String[] = ["coaches", "actors", "providers"];

    constructor(data?: Partial<Director>) {
        Object.assign(this, data);
    }
}
