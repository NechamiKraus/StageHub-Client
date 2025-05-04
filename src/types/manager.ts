
export class Manager {

    name!: String;
    phone!: String;
    email!: String;
    password!: String;
    list: String[] = ["directors"];

    constructor(data?: Partial<Manager>) {
        Object.assign(this, data);
    }
}