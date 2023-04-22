export default class Application {
    public firstName: String;
    public lastName: String;
    public phone: String;
    public address: String;
    public address2: number|string;
    public city: String;
    public area: String;
    public email: String;
    public province: string;
    public school:string;
    public schoolCountry: String;
    public schoolDegree: String;
    public schoolMajor: String;
    public schoolEnd: String;
    public timeApplied: boolean;
    public postingId: boolean;
    public coverletter: String;
    public resume: String;
    public experiences: string[]
    public docId:string
    public status:string
    public positionName: string
    public isCoverLetter: boolean
    public isResume: boolean


    constructor(
        firstName: String,
        lastName: String,
        phone: String,
        address: String,
        address2: number|string,
        city: String,
        area: String,
        email: String,
        province: string,
        school: string,
        schoolCountry: String,
        schoolDegree: String,
        schoolMajor: String,
        schoolEnd: String,
        timeApplied: boolean,
        postingId: boolean,
        coverletter: String,
        resume: String,
        experiences: string[],
        docId:string,
        status:string,
        positionName:string,
        isCoverLetter:boolean,
        isResume:boolean,
       
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
      this.address = address;
      this.address2 = address2;
      this.city = city;
      this.area = area;
      this.email = email;
      this.province = province;
      this.school = school;
      this.schoolCountry = schoolCountry;
      this.schoolDegree = schoolDegree;
      this.schoolMajor = schoolMajor;
      this.schoolEnd = schoolEnd;
      this.timeApplied = timeApplied;
      this.postingId = postingId;
      this.coverletter = coverletter;
      this.resume = resume;
      this.experiences = experiences;
      this.docId=docId;
      this.status=status;
      this.positionName=positionName;
      this.isCoverLetter=isCoverLetter;
      this.isResume=isResume;
      
    }
  }
  