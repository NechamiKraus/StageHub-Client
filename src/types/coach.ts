import { Specialization } from "../enums/specialization";

export class Coach {

    name!: String;
    specialization!: Specialization;
    directorId!: String;
    phone!: String;
    email!: String;
    password!: String;
    list: String[] = ["actors"];

    constructor(data?: Partial<Coach>) {
        Object.assign(this, data);
    }
}