export default class JobsOverview {
  public position: String;
  public location: String;
  public company: String;
  public contract: String;
  public jobPosterID: number;
  public salary: String;
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
    salary: string,
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
    this.salary = salary;
    this.description = description;
    this.email = email;
    this.mandatoryResume = mandatoryResume;
    this.mandatoryCoverLetter = mandatoryCoverLetter;
    this.postingDeadline = postingDeadline;
  }
}
