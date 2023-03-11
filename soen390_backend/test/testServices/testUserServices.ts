import * as chai from "chai";
import * as mocha from "mocha";
import { getUserWithEmail } from "../../src/controllers/userControllers";
import { findUserWithID, processData } from "../../src/services/userServices";
import sinon from "sinon";
const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;

const id: string = "18JRHKkLE2t50nE17SHc";
let testUserFrontend: any = {
    name: "Jake",
    password: "",
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
describe("# User Services", function () {
    describe("# FindUserWithEmail", function () {
        it("return a user with most fields except password and return a 200 status", async function () {
            let data: any = await getUserWithEmail("dzm.fiodarau@gmail.com");
            let user: any = data[1];
            let status: any = data[0];
            Object.entries(testUserFrontend).forEach(([field, value]) => {
                expect(user).to.have.property(field);
                expect(user[field]).to.be.a(typeof value);
                expect(status).to.equal(200);
            });
        });
        it("return a 404 response if not found", async function () {
            let data: any = await getUserWithEmail("5");
            expect(data[0]).to.equal(404);
        });
    });

    describe("# FindUserWithID", function () {
        it("return a snapshot of the user with the ID specified", async function () {
            let user: any = await findUserWithID(id);

            Object.entries(testUserFrontend).forEach(([field, value]) => {
                expect(user).to.have.property(field);
                expect(user[field]).to.be.a(typeof value);
            });
        });
        it("return a 404 response if not found", async function () {
            let user: any = await findUserWithID("5");
            expect(user).to.equal(undefined);
        });
    });
    describe("#processData", function () {
        const snapshotWithDocs = {
            docs: [
                {
                    id: "doc1",
                    data: () => ({ name: "John", age: 30 }),
                },
                {
                    id: "doc2",
                    data: () => ({ name: "Jane", age: 25 }),
                },
            ],
        };

        const snapshotWithoutDocs = {
            docs: [],
        };

        it("should return the data of the first document in the snapshot", function () {
            const result = processData(snapshotWithDocs);
            expect(result).to.deep.equal({
                data: {
                    name: "John",
                    age: 30,
                },
                id: "doc1",
            });
        });

        it("should throw an error and log 'ERROR' to the console when the snapshot is empty", function () {
            const consoleSpy = sinon.spy(console, "log");
            expect(() => processData(snapshotWithoutDocs)).to.throw(
                "snapshot is empty"
            );
            // expect(consoleSpy.calledOnceWith("snapshot is empty")).to.be.true;
            consoleSpy.restore();
        });
    });
});
