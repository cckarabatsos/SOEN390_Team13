import * as mocha from "mocha";
import express from "express";
import request from "supertest";
const it = mocha.it;

const app = express();

describe("Test User Routes", function () {
    describe("Get jobposting/filter", function () {
        it("responds with 400 when the filter is not good", async function () {
            await request(app)
                .get("/jobposting/filter")
                .send({ email: "test@example.com", password: "password" })
                .expect(400);
        });

        it("responds with a 200 and return job postings", async function () {
            await request(app)
                .get("/user/api/login")
                .send({
                    category: "",
                    skip: "0",
                    limit: "10",
                })
                .expect(200);
        });
    });
    describe("Post user/api/posting/:email", function () {
        const payload = {
            email: "LinkedOutInc@gmail.com",
            location: "MTL",
            position: "CEO",
            salary: "200k/yr",
            company: "LinkedOutInc",
            contract: "4 years",
            description:
                "Please join the good team of LinkedOutInc to manage the next biggest infrastructure when it comes to marketing",
            category: "Big boss",
        };
        const badEmail = "lamoutre24@gmail.123124141";
        it("responds with 404 if the email does not exist", async function () {
            await request(app)
                .post("user/api/posting/${badEmail}")
                .send(payload)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(404);
        });
        const notRecruiterEmail = "poda4@gmail.com";
        it("responds with 400 if the user is not a recruiter", async function () {
            await request(app)
                .post("user/api/posting/${notRecruiterEmail}")
                .send(payload)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(400);
        });
        const goodEmail = "LinkedOutInc@gmail.com";
        it("responds with 200 if the user is a recruiter", async function () {
            const response = await request(app)
                .post("user/api/posting/${goodEmail}")
                .send(payload)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(200);
            console.log(response);
        });
    });
});
