import * as mocha from "mocha";
import request from "supertest";
import { expect } from "chai";
import app from "../../src/index";
const it = mocha.it;
console.log(app);
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
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
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
  describe("Get user/api/login", function () {
    it("responds with 404 when user not found", async function () {
      await request(url)
        .get("/user/api/login?email=LinkedOutInc&password=pass123")
        .expect(404);
    });

    it("responds with a 401 when invalid email or password is provided", async function () {
      await request(url)
        .get("/user/api/login?email=LinkedOutInc@gmail.com&password=pass123")
        .expect(401);
    });

    it("responds with a 200 when a valid email and password are provided", async function () {
      await request(url)
        .get("/user/api/login?email=LinkedOutInc@gmail.com1&password=pass123!")
        .expect(200);
    });
  });
  describe("Post user/api/logout", function () {
    it("responds with 200 and logs out user if no error", async function () {
      console.log("Hello from logout route");
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
    it("responds with 404 when user submit without filling out the name field", async function () {
      await request(url)
        .get("/user/api/register")
        .send({
          email: "test@example.com",
          password: "password",
          name: "",
        })
        .expect(404);
    });

    it("responds with 404 when user submit without filling out the password field", async function () {
      await request(url)
        .get("/user/api/register")
        .send({
          email: "test@example.com",
          password: "",
          name: "Matthew aime les test",
        })
        .expect(404);
    });
    it("responds with 404 when user submit without filling out the email field", async function () {
      await request(url)
        .get("/user/api/register")
        .send({
          email: "",
          password: "Test123!",
          name: "Matthew aime les test",
        })
        .expect(404);
    });

    it("responds with 401 when user submit with an already registered email", async function () {
      await request(url)
        .get("/user/api/register")
        .send({
          email: "test@test.com",
          password: "Test123!",
          name: "yoy yoy",
        })
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
    const notRecruiterEmail = "poda4@gmail.com";
    it("responds with 400 if the user is not a recruiter", async function () {
      await request(url)
        .post(`/user/api/posting/${notRecruiterEmail}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)
        .expect(400);
    });
    const goodEmail = "LinkedOutInc@gmail.com";
    it("responds with 200 if the user is a recruiter", async function () {
      await request(url)
        .post(`/user/api/posting/${goodEmail}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)
        .expect(200);
    });
  });
  describe("Post user/accountFile/:userID", async function () {
    it("responds with 404 if wrong type", async function () {
      await request(url)
        .get(`/user/accountFile/${id}?type=badType`)
        .expect(404);
    });
    it("responds with 404 if wrong user id", async function () {
      await request(url)
        .get(`/user/accountFile/${wrongId}?type=resume`)
        .expect(404);
    });
    it("responds with 200 for resume retrieval", async function () {
      await request(url).get(`/user/accountFile/${id}?type=resume`).expect(200);
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

  describe("Get userser/api/sendInvite", async function () {
    const randomEmail1 = makeid(10);
    const randomEmail2 = makeid(10);

    const payload = {
      isRecruiter: false,
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

    const payload2 = {
      isRecruiter: false,
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

    it("responds with 404 if user already invited", async function () {
      await request(url)
        .get(
          `/user/api/sendInvite?receiverEmail=bog1@test.com&senderEmail=bog5@test.com`
        )
        .expect(404);
    });
    it("responds with 200 for 2 non friends user", async function () {
      var user1: any = await request(url)
        .post(`/user/api/register`)
        .send(payload)
        .expect(200);
      var user2: any = await request(url)
        .post(`/user/api/register`)
        .send(payload2)
        .expect(200);
      await request(url)
        .get(
          `/user/api/sendInvite?receiverEmail=${randomEmail1}&senderEmail=${randomEmail2}`
        )
        .expect(200);
      await request(url)
        .post(`/user/delete?userID=${user1._body.registeredUser[1]}`)
        .expect(200);
      await request(url)
        .post(`/user/delete?userID=${user2._body.registeredUser[1]}`)
        .expect(200);
    });
  });
});
