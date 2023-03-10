import * as mocha from "mocha";
import request from "supertest";
import { expect } from "chai";
import app from "../../src/index";

const it = mocha.it;
const url = "http://localhost:4000";
let server: any;
const id = "18JRHKkLE2t50nE17SHc";
const wrongId = "5";

function makeid(length: number) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

describe("Test User Routes", function () {
    before(function () {
        server = app.listen(4000);
    });

    after(function () {
        server.close();
    });
    describe("Post user/id/:userID", function () {
        it("responds with 200 if the userID is valid", async function () {
            await request(url).get(`/user/id/${id}`).expect(200);
        });
        it("responds with 404 if the userID is invalid", async function () {
            await request(url).get(`/user/id/L`).expect(404);
        });
    });
    describe("Get user/api/login", function () {
        it("responds with 404 when user not found", async function () {
            await request(url)
                .get("/user/api/login?email=LinkedOutInc&password=pass123")
                .expect(404);
        });

        it("responds with a 401 when invalid email or password is provided", async function () {
            await request(url)
                .get(
                    "/user/api/login?email=LinkedOutInc@gmail.com1&password=pass123"
                )
                .expect(401);
        });

        it("responds with a 200 when a valid email and password are provided", async function () {
            await request(url)
                .get(
                    "/user/api/login?email=LinkedOutInc@gmail.com1&password=pass123!"
                )
                .expect(200);
        });
    });
    describe("Post user/api/logout", function () {
        it("responds with 200 and logs out user if no error", async function () {
            await request(url)
                .post("/user/api/logout")
                .set("Cookie", ["FrontendUser=somevalue; Path=/; HttpOnly"])
                .send()
                .then((res) => {
                    expect(res.status).equal(200);
                });
        });
    });
    describe("Get user/api/register", function () {
        it("responds with 400 when user submit without filling out the name field", async function () {
            await request(url)
                .post("/user/api/register")
                .send({
                    email: "test@example.com",
                    password: "password",
                    name: "",
                })
                .expect(400);
        });

        it("responds with 400 when user submit without filling out the password field", async function () {
            await request(url)
                .post("/user/api/register")
                .send({
                    email: "test@example.com",
                    password: "",
                    name: "Matthew aime les test",
                })
                .expect(400);
        });
        it("responds with 400 when user submit without filling out the email field", async function () {
            await request(url)
                .post("/user/api/register")
                .send({
                    email: "",
                    password: "Test123!",
                    name: "Matthew aime les test",
                })
                .expect(400);
        });

        it("responds with 401 when user submit with an already registered email", async function () {
            const payload = {
                name: "Joe",
                password: "mama",
                email: "LinkedOutInc@gmail.com1",
                privateKey: "",
                publicKey: "",
                picture: "",
                resume: "",
                coverLetter: "",
                bio: "Admin account",
                currentPosition: "Admin",
                currentCompany: "LinkedOutInc",
                isCompany: false,
            };
            await request(url)
                .post("/user/api/register")
                .send(payload)
                .expect(401);
        });
    });
    describe("Post user/api/posting/:email", async function () {
        const payload = {
            email: "LinkedOutInc@gmail.com",
            location: "MTL",
            position: "CEO",
            salary: "200k/yr",
            company: "LinkedOutInc",
            contract: "4 years",
            description:
                "Please join the good team of LinkedOutInc to manage the next biggest infrastructure when it comes to marketing",
            category: "Big boss",
        };
        const badEmail = "lamoutre24@gmail.123124141";
        it("responds with 404 if the email does not exist", async function () {
            await request(url)
                .post(`/user/api/posting/${badEmail}`)
                .send(payload)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(404);
        });
        const notRecruiterEmail = "dzm.fiodarau@gmail.com";
        it("responds with 400 if the user is not a recruiter", async function () {
            await request(url)
                .post(`/user/api/posting/${notRecruiterEmail}`)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .send(payload)
                .expect(400);
        });

        it("responds with 200 if the user is a recruiter", async function () {
            const goodEmail = "LinkedOutInc@gmail.com1";
            const payload = {
                location: "MTL",
                position: "intern",
                salary: "0k/yr",
                company: "LinkedOutInc",
                description:
                    "Please join the good team of LinkedOutInc to manage the next biggest infrastructure when it comes to marketing",
                remote: true,
                contract: false,
                duration: "4 years",
                type: "internship",
            };
            await request(url)
                .post(`/user/api/posting/${goodEmail}`)
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .send(payload)
                .expect(200);
        });
    });
    describe("Get user/accountFile/:userID", async function () {
        it("responds with 404 if wrong type", async function () {
            await request(url)
                .get(`/user/accountFile/${id}?type=badtype`)
                .expect(404);
        });
        it("responds with 404 if wrong user id", async function () {
            await request(url)
                .get(`/user/accountFile/${wrongId}?type=resume`)
                .expect(404);
        });
        it("responds with 200 for resume retrieval", async function () {
            await request(url)
                .get(`/user/accountFile/${id}?type=resume`)
                .expect(200);
        });
        it("responds with 200 for cover letter retrieval", async function () {
            await request(url)
                .get(`/user/accountFile/${id}?type=coverLetter`)
                .expect(200);
        });
        it("responds with 200 for profile picture retrieval", async function () {
            await request(url)
                .get(`/user/accountFile/${id}?type=picture`)
                .expect(200);
        });
    });

    let response2: any;
    let response1: any;
    const randomEmail1 = makeid(10);
    const randomEmail2 = makeid(10);
    describe("Get user/api/sendInvite", async function () {
        let payload = {
            isCompany: false,
            currentCompany: "Concordia University",
            currentPosition: "Student",
            bio: "I am Liam and I want to be an engineer.",
            coverLetter: "",
            resume: "",
            picture: "",
            publicKey: "",
            privateKey: "",
            email: randomEmail1,
            password: "123",
            name: "bog test",
        };
        let payload2 = {
            isCompany: false,
            currentCompany: "Concordia University",
            currentPosition: "Student",
            bio: "I am Liam and I want to be an engineer.",
            coverLetter: "",
            resume: "",
            picture: "",
            publicKey: "",
            privateKey: "",
            email: randomEmail2,
            password: "123",
            name: "bog test",
        };
        it("responds with 200 for 2 non friends user", async function () {
            response1 = await request(url)
                .post(`/user/api/register`)
                .send(payload)
                .expect(200);
            response2 = await request(url)
                .post(`/user/api/register`)
                .send(payload2)
                .expect(200);
            await request(url)
                .get(
                    `/user/api/sendInvite?receiverEmail=${randomEmail1}&senderEmail=${randomEmail2}`
                )
                .expect(200);
        });
    });
    describe("Get user/api/manageInvite", function () {
        it("responds with 200 when you can accept an invite", async function () {
            await request(url)
                .get(
                    `/user/api/manageInvite?invitedEmail=${randomEmail1}&senderEmail=${randomEmail2}&isAccept=true`
                )
                .expect(200);
        });
        it("responds with 404 when you already accepted the user", async function () {
            await request(url)
                .get(
                    `/user/api/manageInvite?invitedEmail=${randomEmail1}&senderEmail=${randomEmail2}&isAccept=true`
                )
                .expect(404);
            console.log(response1.body);
        });
    });

    describe("Get user/api/getPendingInvitations", function () {
        it("responds with 200 when you can get the invitations", async function () {
            await request(url)
                .get(
                    `/user/api/getPendingInvitations?userEmail=dzm.fiodarau@gmail.com`
                )
                .expect(200);
        });
        it("responds with 404 when the account doesnt exist", async function () {
            await request(url)
                .get(
                    `/user/api/getPendingInvitations?userEmail=dzm.fiodarau@gmail.co`
                )
                .expect(404);
            await request(url)
                .post(`/user/delete/${response1.body.registeredUser[1]}`)
                .expect(200);
        });
    });
    describe("Get user/api/follow", function () {
        it("responds with 200 when you can follow a company", async function () {
            let companyID = "i2iLvPkBHmkV43PufHVp";
            await request(url)
                .get(
                    `/user/api/follow?senderID=${response2.body.registeredUser[1]}&receiverID=${companyID}`
                )
                .expect(200);
        });
        it("responds with 404 when you already follow a company", async function () {
            let companyID = "i2iLvPkBHmkV43PufHVp";
            await request(url)
                .get(
                    `/user/api/follow?senderID=${response2.body.registeredUser[1]}&receiverID=${companyID}`
                )
                .expect(404);
        });
    });
    describe("Get user/api/unFollow", function () {
        it("responds with 200 when you can unFollow a company", async function () {
            let companyID = "i2iLvPkBHmkV43PufHVp";
            await request(url)
                .get(
                    `/user/api/unFollow?senderID=${response2.body.registeredUser[1]}&receiverID=${companyID}`
                )
                .expect(200);
        });
        it("responds with 404 when you already unFollowed a company", async function () {
            let companyID = "i2iLvPkBHmkV43PufHVp";
            await request(url)
                .get(
                    `/user/api/unFollow?senderID=${response2.body.registeredUser[1]}&receiverID=${companyID}`
                )
                .expect(404);
            await request(url)
                .post(`/user/delete/${response2.body.registeredUser[1]}`)
                .expect(200);
        });
    });
});
