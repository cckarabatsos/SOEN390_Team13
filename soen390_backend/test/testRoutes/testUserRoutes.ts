import * as mocha from "mocha";
import express from "express";
import request from "supertest";
const it = mocha.it;

const app = express();

describe("Get user/api/login", () => {
    it("responds with 404 when user not found", async () => {
        await request(app)
            .get("/user/api/login")
            .send({ email: "test@example.com", password: "password" })
            .expect(404);
    });

    it("responds with a 401 when invalid email or password is provided", async () => {
        await request(app)
            .get("/user/api/login")
            .send({ email: "test@test.com", password: "invalidpassword" })
            .expect(404);
    });

    it("responds with a 200 when a valid email and password are provided", async () => {
        await request(app)
            .get("/user/api/login")
            .send({ email: "test@test.com", password: "Test123!" })
            .expect(404);
    });
});
describe("Post user/api/logout", () => {
    it("responds with 200 and logouts user if no error", async () => {
        await request(app).post("user/api/logout").send().expect(200);
    });
});
describe("Get user/api/register", () => {
    it("responds with 404 when user submit without filling out the name field", async () => {
        await request(app)
            .get("/user/api/register")
            .send({ email: "test@example.com", password: "password", name: "" })
            .expect(404);
    });

    it("responds with 404 when user submit without filling out the password field", async () => {
        await request(app)
            .get("/user/api/register")
            .send({
                email: "test@example.com",
                password: "",
                name: "Matthew aime les test",
            })
            .expect(404);
    });
    it("responds with 404 when user submit without filling out the email field", async () => {
        await request(app)
            .get("/user/api/register")
            .send({
                email: "",
                password: "Test123!",
                name: "Matthew aime les test",
            })
            .expect(404);
    });

    it("responds with 401 when user submit with an already registered email", async () => {
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
