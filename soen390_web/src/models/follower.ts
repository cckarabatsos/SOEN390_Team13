export class Follower {
    public userID: String;
    public followerID: String;
    public date: String;
    constructor(clone: Follower) {
        this.userID = "";
        this.followerID = "";
        this.date = "";
        if (!!clone) {
            this.userID = clone.userID;
            this.followerID = clone.followerID;
            this.date = clone.date;
        }
    }
}
