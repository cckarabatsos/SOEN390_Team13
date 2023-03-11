import * as mocha from "mocha";
import app from "../../src/index";
import request from "supertest";
const it = mocha.it;
const url = "http://localhost:4000";
let server: any;
describe("Test Job Posting Routes", function () {
    before(function () {
        server = app.listen(4000);
    });

    after(function () {
        server.close();
    });

    describe("Get jobposting/filter/products", function () {
        it("responds with a 200 and return job postings", async function () {
            await request(url)
                .get(
                    "/jobposting/filter/products?location=mtl&company&position&type=internship&skip=0&limit=10&remote=true"
                )
                .expect(200);
        });
        it("responds with a 400", async function () {
            await request(url)
                .get(
                    "/jobposting/filter/products?location=mtl&company&position&type=internship&skip=0&limit=b&remote=true"
                )
                .expect(400);
        });
    });
});
