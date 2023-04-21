import * as mocha from "mocha";
import app from "../../src/index";
import request from "supertest";
const it = mocha.it;
const url = "http://localhost:4000";
let server: any;
let adminID: string = "fhQxGqeXcZ6WT2hoSsq7";
let notAdminID: string = "gvox7y6XFH0iF5sjbnRJ";
describe("Test Report Routes", function () {
    before(function () {
        server = app.listen(4000);
    });

    after(function () {
        server.close();
    });

    describe("Get batchReports", function () {
        it("responds with 200 when we have an admin account and everything functions ", async function () {
            await request(url)
                .get(`/reports/batchReports?userID=${adminID}`)
                .expect(200);
        });
        it("responds with a 400", async function () {
            await request(url)
                .get(`/reports/batchReports?userID=${notAdminID}`)
                .expect(400);
        });
    });
    let ID: string;
    describe("Post New Report", function () {
        it("responds with 200 and a JSON containing docID when we post a new report", async function () {
            const payload = {
                reportedID: "3Ri6yXlYSo7rCQk4t4ks",
                reason: "It's Inappropriate",
                reporterID: "i2iLvPkBHmkV43PufHVp",
            };
            const response = await request(url)
                .post("/reports/newReport")
                .send(payload)
                .expect(200);
            ID = response.body;
        });
        it("responds with a 400 when the payload is invalid", async function () {
            const invalidPayload = {
                reportedID: "3Ri6yXlYSo7rCQk4t4ks",
                reporterID: "i2iLvPkBHmkV43PufHVp",
            };
            await request(url)
                .post("/reports/newReport")
                .send(invalidPayload)
                .expect(400);
        });
        it("responds with 200 when the ID is valid", async function () {
            await request(url).delete(`/reports/${ID}`).expect(200);
        });
        it("responds with 404 when the ID is invalid", async function () {
            await request(url).delete(`/reports/${ID}`).expect(404);
        });
    });

    describe("VerdictReport", function () {
        it("responds with 200 and deletes a report when its ", async function () {
            const payload = {
                reportedID: "gvox7y6XFH0iF5sjbnRJ",
                reason: "It's Inappropriate",
                reporterID: "u1f1EgzrZSp9LWhtA2AR",
            };
            const response = await request(url)
                .post("/reports/newReport")
                .send(payload)
                .expect(200);
            ID = response.body;
            const newPayload = {
                reportID: `${ID}`,
                reportedID: "gvox7y6XFH0iF5sjbnRJ",
                banned: false,
            };
            await request(url)
                .post(`/reports/verdictReport`)
                .send(newPayload)
                .expect(200);
        });
        it("responds with a 404 when there is an error", async function () {
            const payload = {
                reportID: "EKbDtTB9c4uA6GTHXxxp",
                reportedID: "gvox7y6XFH0iF5sjbnRJ",
                banned: false,
            };
            await request(url)
                .post(`/reports/verdictReport`)
                .send(payload)
                .expect(404);
        });
    });
});
