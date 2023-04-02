export default class JobsOverview {
  public position: String;
  public location: String;
  public company: String;
  public contract: String;
  public jobPosterID: number;
  public postingID: String;
  public jobID: String;
  public salary: number;
  public description: String;
  public email: String;
  public mandatoryResume: boolean;
  public mandatoryCoverLetter: boolean;
  public postingDeadline: String;

  constructor(
    position: String,
    location: String,
    company: String,
    contract: String,
    jobPosterID: number,
    postingID: String,
    jobID: String,
    salary: number,
    description: String,
    email: String,
    mandatoryResume: boolean,
    mandatoryCoverLetter: boolean,
    postingDeadline: String
  ) {
    this.position = position;
    this.location = location;
    this.company = company;
    this.contract = contract;
    this.jobPosterID = jobPosterID;
    this.postingID = postingID;
    this.jobID = jobID;
    this.salary = salary;
    this.description = description;
    this.email = email;
    this.mandatoryResume = mandatoryResume;
    this.mandatoryCoverLetter = mandatoryCoverLetter;
    this.postingDeadline = postingDeadline;
  }
}
