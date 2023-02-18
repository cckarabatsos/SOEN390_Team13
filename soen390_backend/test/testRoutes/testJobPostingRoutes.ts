import * as mocha from "mocha";
import express from "express";
import request from "supertest";
const it = mocha.it;

const app = express();
describe("Test Job Posting Routes", function () {
    describe("Get jobposting/filter/products", async function () {
        it("responds with 400 when the filter is not good", async function () {
            await request(app).get("/jobposting/filter/products?").expect(404);
        });

        it("responds with a 200 and return job postings", async function () {
            await request(app)
                .get(
                    "/jobposting/filter/products?category=Big boss&skip=0&limit=10"
                )
                .expect(404);
        });
    });
});
