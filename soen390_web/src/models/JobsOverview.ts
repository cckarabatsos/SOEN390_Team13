export default class JobsOverview {
  public position: String;
  public location: String;
  public company: String;
  public contract: String;
  public postingID: String;
  public jobID: String;
  public jobPosterID: number | String;
  public salary: String;
  public description: String;
  public email: String;
  public mandatoryResume: boolean;
  public mandatoryCoverLetter: boolean;
  public postingDeadline: String;
  public provenance:String

  constructor(
    position: String,
    location: String,
    company: String,
    contract: String,
    jobPosterID: number | string,
    postingID: String,
    jobID: String,
    salary: String,
    description: String,
    email: String,
    mandatoryResume: boolean,
    mandatoryCoverLetter: boolean,
    postingDeadline: String,
    provenance:String
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
    this.provenance=provenance;
  }
}
