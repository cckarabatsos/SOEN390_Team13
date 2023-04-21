import * as mocha from "mocha";
import app from "../../src/index";
import request from "supertest";
const it = mocha.it;
const url = "http://localhost:4000";
let server: any;
const userID = "gvox7y6XFH0iF5sjbnRJ";
const badUserID = "5";
const jobPostingID = "95VQaEcB8zLrhY0hA9XL";

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
    describe("Get jobposting/getJobSuggestions/:userID", function () {
        it("responds with 200 when job suggestions retrieved for a specific user", async function () {
            await request(url)
                .get(`/jobposting/getJobSuggestions/${userID}`)
                .expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .get(`/jobposting/getJobSuggestions/${badUserID}`)
                .expect(404);
        });
    });
    describe("Get jobposting/id/:JobPostingID", function () {
        it("responds with 200 when job posting retrieved with a job posting ID", async function () {
            await request(url)
                .get(`/jobposting/id/${jobPostingID}`)
                .expect(200);
        });
        it("responds with 404 when job posting retrieved with a job posting ID that does not exist", async function () {
            await request(url)
                .get(`/jobposting/id/${badUserID}`)
                .expect(404);
        });
    });
});
