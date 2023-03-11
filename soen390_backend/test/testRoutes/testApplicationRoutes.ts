import * as mocha from "mocha";
import app from "../../src/index";
import request from "supertest";
import { deleteApplicationWithId } from "../../src/services/applicationServices";
const it = mocha.it;
const url = "http://localhost:4000";
let server: any;
const userID = "18JRHKkLE2t50nE17SHc";
const companyID = "i2iLvPkBHmkV43PufHVp";
const postingID = "B9edMZe4tjUEAFcimWUu";
const badUserID = "5";
const postApplication = {
    email: "abc@gmail.com",
    firstName: "firstName",
    lastName: "lastName",
    phone: "123-456-7891",
    address: "123 Main St.",
    address2: "",
    city: "Montreal",
    area: "J7P9I8",
    province: "QC",
    school: "Concordia University",
    schoolCountry: "Canada",
    schoolDegree: "Bachelor of Engineering",
    schoolEnd: "01-05-2024",
    schoolMajor: "Software Engineering",
    timestamp: "10-03-2023",
    postingID: postingID,
    attachResume: false,
    attachCoverLetter: true,
    experience: ["Ville de Montreal,Marketing Intern,May 2021,Sept 2021", "Nventive,Developer Intern,May 2022,Dec 2022"]
};

describe("Test Application Routes", function () {
    before(function () {
        server = app.listen(4000);
    });

    after(function () {
        server.close();
    });

    describe("Post application/:userID", function () {
        it("responds with 200 when application stored for a specific user", async function () {
            await deleteApplicationWithId(userID, postingID);
            await request(url)
                .post(`/application/${userID}`)
                .send(postApplication)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .post(`/application/${badUserID}`)
                .send(postApplication)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(404);
        });
        it("responds with a 400 when user with passed already applied to specified job posting", async function () {
            await request(url)
                .post(`/application/${userID}`)
                .send(postApplication)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(400);
        });
    });
    describe("Get application/getLastApplication/:userID", function () {
        it("responds with 200 when last application for a specific user", async function () {
            await request(url)
                .get(`/application/getLastApplication/${userID}`)
                .expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .get(`/application/getLastApplication/${badUserID}`)
                .expect(404);
        });
        it("responds with a 404 when user with passed id is a company", async function () {
            await request(url)
                .get(`/application/getLastApplication/${companyID}`)
                .expect(404);
        });
    });
    describe("Get application/getApplications/:userID", function () {
        it("responds with 200 when applications for a specific company and job posting", async function () {
            await request(url)
                .get(`/application/getApplications/${companyID}?postingID=${postingID}`)
                .expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .get(`/application/getApplications/${badUserID}?postingID=${postingID}`)
                .expect(404);
        });
        it("responds with a 404 when user with passed id is not a company", async function () {
            await request(url)
                .get(`/application/getApplications/${userID}?postingID=${postingID}`)
                .expect(404);
        });
        it("responds with a 404 when posting with passed posting ID is not associated with passed company", async function () {
            await request(url)
                .get(`/application/getApplications/${companyID}?postingID=${badUserID}`)
                .expect(404);
        });
    });
    describe("Get application/getApplicationHistory/:userID", function () {
        it("responds with 200 when application history for a specific user", async function () {
            await request(url)
                .get(`/application/getApplicationHistory/${userID}`)
                .expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .get(`/application/getApplicationHistory/${badUserID}`)
                .expect(404);
        });
        it("responds with a 404 when user with passed id is a company", async function () {
            await request(url)
                .get(`/application/getApplicationHistory/${companyID}`)
                .expect(404);
        });
    });
    describe("Post experience/remove/:docID", function () {
        it("responds with 200 when application removed for a specific user and specific job posting", async function () {
            await request(url)
                .post(`/application/remove/${userID}?postingID=${postingID}`)
                .expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .post(`/application/remove/${badUserID}?postingID=${postingID}`)
                .expect(404);
        });
        it("responds with a 404 when job posting with passed id does not exist", async function () {
            await request(url)
                .post(`/experience/remove/${userID}?postingID=${badUserID}`)
                .expect(404);
        });
    });
});
