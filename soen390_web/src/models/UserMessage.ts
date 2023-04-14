export default class UserMessage {
    public name: String;
    public avatar: string;
    public userID: string[];
    
    constructor(name:string,userID:string[],avatar:string) {
        this.name = name;
        this.avatar = avatar;
        this.userID = userID;
    }
}