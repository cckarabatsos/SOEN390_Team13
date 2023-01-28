import * as chai from "chai";
import * as mocha from "mocha";

import {
    getUserWithID,
    getUserWithEmail,
    registerUser,
} from "../../src/controllers/userControllers";

const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;
const id: string = "18JRHKkLE2t50nE17SHc";
let testUser: any = {
    userId: 1,
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
    isRecruiter: false,
};
let testUserFrontend: any = {
    userId: 1,
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
    isRecruiter: false,
};

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
        it("return a user with most fields except password", async function () {
            let data: any = await getUserWithEmail(
                "matthew.beaulieu631@gmail.com"
            );
            let user: any = data[1];
            Object.entries(testUserFrontend).forEach(([field, value]) => {
                expect(user).to.have.property(field);
                expect(user[field]).to.be.a(typeof value);
            });
        });
        it("return a 404 response if not found", async function () {
            let data: any = await getUserWithEmail("5");
            expect(data[0]).to.equal(404);
        });
        it("return a 200 response code if succesful", async function () {
            let data: any = await getUserWithEmail(id);
            expect(data[0]).to.equal(200);
        });
    });
    describe("# registerUser", function () {});
});
