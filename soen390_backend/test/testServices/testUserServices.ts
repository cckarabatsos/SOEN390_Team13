// import * as chai from "chai";
// import * as mocha from "mocha";
// import { getUserWithEmail } from "../../src/controllers/userControllers";
// import { findUserWithID } from "../../src/services/userServices";

// const expect = chai.expect;
// const describe = mocha.describe;
// const it = mocha.it;

// const id: string = "18JRHKkLE2t50nE17SHc";
// let testUserFrontend: any = {
//     name: "Jake",
//     password: "",
//     email: "mat@gmail.ca",
//     privateKey: "",
//     publicKey: "",
//     picture: "",
//     resume: "",
//     coverLetter: "",
//     bio: "",
//     currentPosition: "",
//     currentCompany: "",
//     isCompany: false,
// };
// describe("# User Services", function () {
//     describe("# FindUserWithEmail", function () {
//         it("return a user with most fields except password and return a 200 status", async function () {
//             let data: any = await getUserWithEmail(
//                 "matthew.beaulieu631@gmail.com"
//             );
//             let user: any = data[1];
//             let status: any = data[0];
//             Object.entries(testUserFrontend).forEach(([field, value]) => {
//                 expect(user).to.have.property(field);
//                 expect(user[field]).to.be.a(typeof value);
//                 expect(status).to.equal(200);
//             });
//         });
//         it("return a 404 response if not found", async function () {
//             let data: any = await getUserWithEmail("5");
//             expect(data[0]).to.equal(404);
//         });
//     });

//     describe("# FindUserWithID", function () {
//         it("return a snapshot of the user with the ID specified", async function () {
//             let user: any = await findUserWithID(id);

//             Object.entries(testUserFrontend).forEach(([field, value]) => {
//                 expect(user).to.have.property(field);
//                 expect(user[field]).to.be.a(typeof value);
//             });
//         });
//         it("return a 404 response if not found", async function () {
//             let user: any = await findUserWithID("5");
//             expect(user).to.equal(undefined);
//         });
//     });
// });
