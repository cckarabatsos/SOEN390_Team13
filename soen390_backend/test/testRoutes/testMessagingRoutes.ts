import * as mocha from "mocha";
import app from "../../src/index";
import request from "supertest";




const it = mocha.it;
console.log(app);
const url = "http://localhost:4000";
let server: any;


describe("Test Messaging Routes", function () {
    before(function () {
        server = app.listen(4000);
    });

    after(function () {
        server.close();
    });


    describe("Get Message/sendMessage", function () {
        let usersEmails="[\"msg1@test.com\",\"msg3@test.com\"]"
        let msg = "test message";
        let senderEmail = "msg1@test.com";
        let wrongSenderEmail = "bad@test.com";
        let wrongUsersEmails="[\"msg1001@test.com\",\"msg3@test.com\"]"

        it("responds with 200 if the the conversation emails exist, the sender email exist and if the mesage given is not null ", async function () {
            await request(url).get(`/messages/sendMessage?senderEmail=${senderEmail}&emails=${usersEmails}&message=${msg}`).expect(200);
        });
        it("responds with 500 if the senderemail is invalid", async function () {
            await request(url).get(`/messages/sendMessage?senderEmail=${wrongSenderEmail}&emails=${usersEmails}&message=${msg}`).expect(500);
        });
        it("responds with 500 if the conversation emails are invalid", async function () {
            await request(url).get(`/messages/sendMessage?senderEmail=${senderEmail}&emails=${wrongUsersEmails}&message=${msg}`).expect(500);
        });
        it("responds with 500 if the message content is empty", async function () {
            await request(url).get(`/messages/sendMessage?senderEmail=${wrongSenderEmail}&emails=${usersEmails}&message=}`).expect(500);
        });
    });

    describe("Get Message/GetAllMessages", function () {
        let usersEmails="[\"msg1@test.com\",\"msg3@test.com\"]"
        let senderEmail = "msg1@test.com";
        let wrongSenderEmail = "bad@test.com";
        let wrongUsersEmails="[\"msg1001@test.com\",\"msg3@test.com\"]"

        it("responds with 200 if the the conversation emails exist, the sender email exist and if the mesage given is not null ", async function () {
            await request(url).get(`/messages/getAllMessages?senderEmail=${senderEmail}&userEmails=${usersEmails}`).expect(200);
        });
        it("responds with 500 if the sender email is invalid", async function () {
            await request(url).get(`/messages/getAllMessages?senderEmail=${wrongSenderEmail}&userEmails=${usersEmails}`).expect(500);
        });
        it("responds with 500 if the conversation emails are invalid or the conversation does not exsit", async function () {
            await request(url).get(`/messages/getAllMessages?senderEmail=${senderEmail}&userEmails=${wrongUsersEmails}`).expect(500);
        });
        
    });


    describe("Get Message/updateMessages", function () {
        let usersEmails="[\"msg1@test.com\",\"msg2@test.com\"]"
        let senderEmail = "msg1@test.com";
        let wrongSenderEmail = "bad@test.com";
        let wrongUsersEmails="[\"msg1001@test.com\",\"msg3@test.com\"]"
        let wrongMsgLength=-1

        it("responds with 200 if the the conversation emails exist, the sender email exist and is oits a non negative messages length ", async function () {
            await request(url).get(`/messages/updateMessages?userEmails=${usersEmails}&senderEmail=${senderEmail}&messagesLength=2`).expect(200);
        });

        it("responds with 500 if the sender email is invalid", async function () {
            await request(url).get(`/messages/updateMessages?userEmails=${usersEmails}&senderEmail=${wrongSenderEmail}.com&messagesLength=2`).expect(500);
        });

        it("responds with 500 if the conversation emails are invalid or the conversation does not exsit", async function () {
            await request(url).get(`/messages/updateMessages?userEmails=${wrongUsersEmails}&senderEmail=${senderEmail}.com&messagesLength=2`).expect(500);
        });

        it("responds with 500 if messages lenght are smaller than 0", async function () {
            await request(url).get(`/messages/updateMessages?userEmails=${usersEmails}&senderEmail=${senderEmail}.com&messagesLength=${wrongMsgLength}`).expect(400);
        });
        
    });

    describe("Get messages/getActiveConversation", function () {
        

        it("responds with 200 if the the conversation emails exist, the sender email exist and is oits a non negative messages length ", async function () {
            await request(url).get(`/messages/getActiveConversation?email=oli@hotmail.com`).expect(200);
        });

    
        
    });

    describe("Get messages/getActiveConversation", function () {
        

        it("responds with 500 if the the conversation emails does not exist and if the emails attacher are non valid ones ", async function () {
            await request(url).get(`/messages/createConversation?emails=["msg1001@test.com","msg3@test.com"]`).expect(500);
        });

    
        
    });

})