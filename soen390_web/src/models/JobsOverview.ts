export default class JobsOverview{
    
    public position: String;
    public location: String;
    public company: String;
    public contract: String;
    public jobPosterID: number;
    public salary: number;
    public description: String;
    public email: String;

    constructor(position: String, location: String, company: String, contract: String, jobPosterID: number, salary: number,
        description: String, email: String){
            this.position= position;
            this.location= location;
            this.company= company;
            this.contract= contract;
            this.jobPosterID= jobPosterID;
            this.salary= salary;
            this.description= description;
            this.email=email;
        }
}