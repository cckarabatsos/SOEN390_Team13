import * as mocha from "mocha";
import app from "../../src/index";
import request from "supertest";
import {
    deleteSkillWithId,
    retrieveSkills,
    storeSkill,
} from "../../src/services/skillServices";
import { Skill } from "../../src/models/Skill";
const it = mocha.it;
const url = "http://localhost:4000";
let server: any;
const userID = "18JRHKkLE2t50nE17SHc";
const userID2 = "0NS4CwuBHfd4rDPAIEuC";
const badUserID = "5";
const skill: Skill = {
    name: "skill",
    ownerID: userID2,
};

describe("Test Skill Routes", function () {
    before(function () {
        server = app.listen(4000);
    });

    after(function () {
        server.close();
    });

    describe("Get skill/get/:userID", function () {
        it("responds with 200 when skills for a specific user", async function () {
            await request(url).get(`/skill/get/${userID}`).expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url).get(`/skill/get/${badUserID}`).expect(404);
        });
    });
    describe("Post skill/:userID", function () {
        it("responds with 200 when skills for a specific user", async function () {
            let skills = await retrieveSkills(userID2);
            if (skills) {
                if (skills.length == 10) {
                    await deleteSkillWithId(skills[9].skillID);
                }
            }
            await request(url)
                .post(`/skill/${userID2}`)
                .send({ name: "skill" })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(200);
        });
        it("responds with 400 when adding a skill to a user with max nbr of skills", async function () {
            await request(url)
                .post(`/skill/${userID}`)
                .send({ name: "skill" })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(400);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .post(`/skill/${badUserID}`)
                .send({ name: "skill" })
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .expect(404);
        });
    });
    describe("Post skill/remove/:docID", function () {
        it("responds with 200 when skills for a specific user", async function () {
            let skills = await retrieveSkills(userID2);
            if (skills) {
                if (skills.length == 10) {
                    await deleteSkillWithId(skills[9].skillID);
                }
            }
            let skillID = await storeSkill(skill);
            await request(url).post(`/skill/remove/${skillID}`).expect(200);
        });
        it("responds with a 404 when skill with passed id does not exist", async function () {
            await request(url).post(`/skill/remove/${badUserID}`).expect(404);
        });
    });
});
