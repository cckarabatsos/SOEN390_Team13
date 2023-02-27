import * as mocha from "mocha";
import app from "../../src/index";
import request from "supertest";
import { storeExperience } from "../../src/services/experienceServices";
import { Experience } from "../../src/models/Experience";
const it = mocha.it;
console.log(app);
const url = "http://localhost:4000";
let server: any;
const userID = "18JRHKkLE2t50nE17SHc";
const badUserID = "5";
const experience: Experience = {
    atPresent: false,
    company: "College Francais High School",
    startDate: "01-09-2012",
    endDate: "21-06-2018",
    position: "Student",
    type: "Education",
    ownerID: userID
};

describe("Test Experience Routes", function () {
    before(function () {
        server = app.listen(4000);
    });

    after(function () {
        server.close();
    });

    describe("Get experience/get/:userID", function () {
        it("responds with 200 when experiences retrieved for a specific user", async function () {
            await request(url).get(`/experience/get/${userID}?type=Education`).expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url).get(`/experience/get/${badUserID}?type=Education`).expect(404);
        });
        it("responds with a 404 when passed type is not Education or Work does not exist", async function () {
            await request(url).get(`/experience/get/${badUserID}?type=wrongType`).expect(404);
        });
    });
    describe("Post experience/:userID", function () {
        it("responds with 200 when experience stored for a specific user", async function () {
            await request(url)
                .post(`/experience/${userID}`)
                .send(experience)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .post(`/experience/${badUserID}`)
                .send(experience)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(404);
        });
    });
    describe("Post experience/remove/:docID", function () {
        it("responds with 200 when experience removed for a specific user", async function () {
            let experienceID = await storeExperience(experience);
            await request(url).post(`/experience/remove/${experienceID}`).expect(200);
        });
        it("responds with a 404 when experience with passed id does not exist", async function () {
            await request(url).post(`/experience/remove/${badUserID}`).expect(404);
        });
    });
});