import * as chai from "chai";
import * as mocha from "mocha";
import { db } from "../../src/firebaseconfig";
console.log(db);
import {
    getUserWithID,
    getUserWithEmail,
    registerUser,
    comparePasswords,
    getAccountFile,
} from "../../src/controllers/userControllers";

const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;
const id: string = "18JRHKkLE2t50nE17SHc";
let testUser: any = {
    name: "Jake",
    password: "123",
    email: "mat@gmail.ca",
    privateKey: "",
    publicKey: "",
    picture: "",
    resume: "",
    coverLetter: "",
    bio: "",
    currentPosition: "",
    currentCompany: "",
    isCompany: false,
};
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

describe("User Controllers", function () {
    describe("# getUserWithID", function () {
        it("return a product with all the fields in the product schema", async function () {
            let data: any = await getUserWithID(id);
            let user: any = data[1];
            Object.entries(testUser).forEach(([field, value]) => {
                expect(user).to.have.property(field);
                expect(user[field]).to.be.a(typeof value);
            });
        });
        it("return a 200 response code if succesful", async function () {
            let data: any = await getUserWithID(id);
            expect(data[0]).to.equal(200);
        });
        it("return a 404 response code if not found", async function () {
            let data: any = await getUserWithID("5");
            expect(data[0]).to.equal(404);
        });
    });
    describe("# getUserWithEmail", function () {
        // it("return a user with most fields except password and return a 200 status", async function () {
        //     let data: any = await getUserWithEmail("LinkedOutInc@gmail.com1");
        //     let user: any = data[1];
        //     let status: any = data[0];
        //     Object.entries(testUserFrontend).forEach(([field, value]) => {
        //         expect(user).to.have.property(field);
        //         expect(user[field]).to.be.a(typeof value);
        //         expect(status).to.equal(200);
        //     });
        // });
        it("return a 404 response if not found", async function () {
            let data: any = await getUserWithEmail("5");
            expect(data[0]).to.equal(404);
        });
    });
    describe("# registerUser", function () {
        it("return a 401 response code if user with same email already exists", async function () {
            await registerUser(testUser);
            let data: any = await registerUser(testUser);
            expect(data[0]).to.equal(401);
        });
    });
    describe("# comparePasswords", function () {
        it("return true when password are the same", async function () {
            let match: any = await comparePasswords("123", "123");
            expect(match).to.equal(true);
        });
        it("return false when password are different", async function () {
            let match: any = await comparePasswords("123", "1234");
            expect(match).to.equal(false);
        });
    });
    describe("# accountFile", function () {
        it("return a 200 response code retrieving resume", async function () {
            let data: any = await getAccountFile(id, "resume");
            expect(data[0]).to.equal(200);
        });
        it("return a 200 response code retrieving cover letter", async function () {
            let data: any = await getAccountFile(id, "coverLetter");
            expect(data[0]).to.equal(200);
        });
        it("return a 200 response code retrieving profile picture", async function () {
            let data: any = await getAccountFile(id, "picture");
            expect(data[0]).to.equal(200);
        });
        it("return a 404 response code retrieving account file with wrong type", async function () {
            let data: any = await getAccountFile(id, "badType");
            expect(data[0]).to.equal(404);
        });
        it("return a 404 response code retrieving account file with wrong user ID", async function () {
            let data: any = await getAccountFile("5", "resume");
            expect(data[0]).to.equal(404);
        });
    });
});
