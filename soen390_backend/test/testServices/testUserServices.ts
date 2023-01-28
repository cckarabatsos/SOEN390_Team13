import * as chai from "chai";
import * as mocha from "mocha";

import {
    findUserWithEmail,
    // findUserWithID,
    // storeUser,
    // deleteUserWithId,
} from "../../src/services/userServices";
let testEmail = "test@test.com";
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
    isRecruiter: false,
};
const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;
describe("# User Services", function () {
    describe("# Find User With Email", async function () {
        const result = new Promise((resolve, _) => {
            findUserWithEmail(testEmail, (user) => {
                if (user == null) {
                    resolve([404, null]);
                } else {
                    resolve([200, user]);
                }
            });
        }).then();
        const badResult = new Promise((resolve, _) => {
            findUserWithEmail(testEmail, (user) => {
                if (user == null) {
                    resolve([404, null]);
                } else {
                    resolve([200, user]);
                }
            });
        }).then();
        it("return 200 and a user object if successful", async function () {
            let resolved: any = await badResult;
            let status = resolved[0];
            let user = resolved[1];
            expect(status.to.equal(200));
            Object.entries(testUser).forEach(([field, value]) => {
                expect(user).to.have.property(field);
                expect(user[field]).to.be.a(typeof value);
            });
        });
        it("return 404 and null if unsucessful", async function () {
            let badresolved: any = await result;
            let badStatus = badresolved[0];
            let badUser = badresolved[1];
            expect(badStatus.to.equal(404));
            expect(badUser.to.equal(null));
        });
    });
});
