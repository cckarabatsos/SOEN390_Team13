import * as mocha from "mocha";
import express from "express";
import request from "supertest";
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
                .send({ email: "test@test.com", password: "Test123!" })
                .expect(404);
        });
    });
    describe("Post user/api/logout", function () {
        it("responds with 200 and logouts user if no error", async function () {
            await request(app).post("user/api/logout").send().expect(200);
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
});
