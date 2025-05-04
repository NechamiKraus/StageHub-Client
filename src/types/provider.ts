
export class Provider {

    name!:String;
    phone!:String;
    email!:String;
    product!:String;
    price!:Number;
    password!:String;
    list: String[] = ["product"];

    constructor(data?: Partial<Provider>) {
        Object.assign(this, data);
    }
}