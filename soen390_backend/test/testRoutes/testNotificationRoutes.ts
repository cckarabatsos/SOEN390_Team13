import * as mocha from "mocha";
import app from "../../src/index";
import request from "supertest";
import { storeNotification } from "../../src/services/notificationServices";
import { Notification } from "../../src/models/Notification";
const it = mocha.it;
const url = "http://localhost:4000";
let server: any;
const userID = "gvox7y6XFH0iF5sjbnRJ";
const badUserID = "5";
const notification: Notification = {
    logo: "logo",
    message: "This is a notification test",
    timestamp: new Date().toLocaleString(),
    category: "test",
    relatedEntity: userID,
    ownerID: userID,
};

describe("Test Notification Routes", function () {
    before(function () {
        server = app.listen(4000);
    });

    after(function () {
        server.close();
    });

    describe("Get notification/getNotifications/:userID", function () {
        it("responds with 200 when notifications retrieved for a specific user", async function () {
            await request(url)
                .get(`/notification/getNotifications/${userID}`)
                .expect(200);
        });
        it("responds with a 404 when user with passed id does not exist", async function () {
            await request(url)
                .get(`/notification/getNotifications/${badUserID}`)
                .expect(404);
        });
    });
    describe("Post notification/remove/:docID", function () {
        it("responds with 200 when notification removed for a specific user", async function () {
            let notificationID = await storeNotification(notification);
            await request(url)
                .post(`/notification/remove/${notificationID}`)
                .expect(200);
        });
        it("responds with a 404 when notification with passed id does not exist", async function () {
            await request(url)
                .post(`/notification/remove/${badUserID}`)
                .expect(404);
        });
    });
});
