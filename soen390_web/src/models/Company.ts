export default class Company{

    public companyName: String;
    public followerCount: number ;
    public email: String;
    public description: String;
    public pictureURL: String
    public location: String;
    public id:number;
    public followCompany:boolean
    public companyId:string

    public constructor(companyName, followerCount, email, description, pictureURL,location,id, followCompany,companyId){
        this.companyName = companyName
        this.followerCount = followerCount
        this.email = email
        this.description = description
        this.pictureURL = pictureURL
        this.location = location
        this.id = id
        this.followCompany=followCompany
        this.companyId = companyId
    }
}