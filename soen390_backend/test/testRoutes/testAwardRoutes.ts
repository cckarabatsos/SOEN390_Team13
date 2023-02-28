import * as mocha from "mocha";
import app from "../../src/index";
import request from "supertest";
import { storeAward } from "../../src/services/awardServices";
import { Award } from "../../src/models/Award";
const it = mocha.it;
console.log(app);
const url = "http://localhost:4000";
let server: any;
const userID = "18JRHKkLE2t50nE17SHc";
const badUserID = "5";
const award: Award = {
    name: "award",
    description: "this is a test award.",
    timestamp: "09-02-2010",
    ownerID: userID
};

describe("Test Award Routes", function () {
    before(function () {
        server = app.listen(4000);
    });

    after(function () {
        server.close();
    });

    describe("Get award/get/:userID", function () {
        it("responds with 200 when awards for a specific user", async function () {
            await request(url).get(`/award/get/${userID}`).expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url).get(`/award/get/${badUserID}`).expect(404);
        });
    });
    describe("Post award/:userID", function () {
        it("responds with 200 when awards for a specific user", async function () {
            await request(url)
                .post(`/award/${userID}`)
                .send(award)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .post(`/award/${badUserID}`)
                .send(award)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(404);
        });
    });
    describe("Post award/remove/:docID", function () {
        it("responds with 200 when awards for a specific user", async function () {
            let awardID = await storeAward(award);
            await request(url).post(`/award/remove/${awardID}`).expect(200);
        });
        it("responds with a 404 when award with passed id does not exist", async function () {
            await request(url).post(`/award/remove/${badUserID}`).expect(404);
        });
    });
});