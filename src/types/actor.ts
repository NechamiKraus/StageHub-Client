
export class Actor {

    name!: String;
    role!: String;
    coachId!: String;
    directorId!: String;
    phone!: String;
    email!: String;
    password!: String;
    list: String[] = ["coaches"];

    constructor(data?: Partial<Actor>) {
        Object.assign(this, data);
    }
}

