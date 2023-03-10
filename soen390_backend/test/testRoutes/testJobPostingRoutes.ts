// import * as mocha from "mocha";
// import app from "../../src/index";
// import request from "supertest";
// const it = mocha.it;
// const url = "http://localhost:4000";
// let server: any;
// describe("Test Job Posting Routes", function () {
//     before(function () {
//         server = app.listen(4000);
//     });

//     after(function () {
//         server.close();
//     });

//     describe("Get jobposting/filter/products", function () {
//         it("responds with 200 when the filter is not good but query everything", async function () {
//             await request(url).get("/jobposting/filter/products?").expect(200);
//         });
//         it("responds with a 200 and return job postings", async function () {
//             await request(url)
//                 .get(
//                     "/jobposting/filter/products?category=Big boss&skip=0&limit=10"
//                 )
//                 .expect(200);
//         });
//     });
// });
