export class User {
    public name: String;
    public password: String;
    public seller: boolean;
    public age: number;
    public email: String;
    public address: String;
    constructor(clone: User) {
        this.name = "";
        this.password = "";
        this.age = 0;
        this.email = "";
        this.address = "";
        this.seller = false;
        if (!!clone) {
            this.name = clone.name;
            this.password = clone.password;
            this.seller = clone.seller;
            this.age = clone.age;
            this.email = clone.email;
            this.address = clone.address;
        }
    }
}
