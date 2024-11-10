import { Specialization } from "../enums/specialization";

export interface Coach {

    name: String;
    specialization: Specialization;
    directorId: String;
    phone: String;
    email: String;
    password: String;
}