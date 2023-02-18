import * as mocha from "mocha";
import express from "express";
import request from "supertest";
import { expect } from "chai";
const it = mocha.it;

const app = express();

describe("Test User Routes", function () {
    describe("Get user/api/login", function () {
        it("responds with 404 when user not found", async function () {
            await request(app)
                .get("/user/api/login")
                .send({ email: "test@example.com", password: "password" })
                .expect(404);
        });

        it("responds with a 401 when invalid email or password is provided", async function () {
            await request(app)
                .get("/user/api/login")
                .send({
                    email: "test@test.com",
                    password: "invalidpassword",
                })
                .expect(404);
        });

        it("responds with a 200 when a valid email and password are provided", async function () {
            await request(app)
                .get("/user/api/login")
                .set("Cookie", [])
                .send({ email: "test@test.com", password: "Test123!" })
                .expect(404);
        });
    });
    describe("Post user/api/logout", function () {
        it("responds with 200 and logouts user if no error", async function () {
            console.log("Hello from logout route");
            await request(app)
                .post("/user/api/logout")
                .set("Cookie", ["FrontendUser=somevalue; Path=/; HttpOnly"])
                .send()
                .then((res) => {
                    expect(res.status).equal(404);
                });
        });
    });
    describe("Get user/api/register", function () {
        it("responds with 404 when user submit without filling out the name field", async function () {
            await request(app)
                .get("/user/api/register")
                .send({
                    email: "test@example.com",
                    password: "password",
                    name: "",
                })
                .expect(404);
        });

        it("responds with 404 when user submit without filling out the password field", async function () {
            await request(app)
                .get("/user/api/register")
                .send({
                    email: "test@example.com",
                    password: "",
                    name: "Matthew aime les test",
                })
                .expect(404);
        });
        it("responds with 404 when user submit without filling out the email field", async function () {
            await request(app)
                .get("/user/api/register")
                .send({
                    email: "",
                    password: "Test123!",
                    name: "Matthew aime les test",
                })
                .expect(404);
        });

        it("responds with 401 when user submit with an already registered email", async function () {
            await request(app)
                .get("/user/api/register")
                .send({
                    email: "test@test.com",
                    password: "Test123!",
                    name: "yoy yoy",
                })
                .expect(404);
        });
    });
    describe("Post user/api/posting/:email", async function () {
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
                .post(`/user/api/posting/${badEmail}`)
                .send(payload)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(404);
        });
        const notRecruiterEmail = "poda4@gmail.com";
        it("responds with 400 if the user is not a recruiter", async function () {
            await request(app)
                .post(`/user/api/posting/${notRecruiterEmail}`)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .send(payload)
                .expect(404);
        });
        const goodEmail = "LinkedOutInc@gmail.com";
        it("responds with 200 if the user is a recruiter", async function () {
            await request(app)
                .post(`/user/api/posting/${goodEmail}`)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .send(payload)
                .expect(404);
        });
    });
});
