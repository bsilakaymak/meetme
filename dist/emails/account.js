"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const config = require("config");
const sendGridApiKey = process.env.SEND_GRID_API_KEY;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(sendGridApiKey);
const invitationNotificationEmail = (meetingName, email, sender) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        to: email,
        from: "bsilakaymak@gmail.com",
        subject: "A new meeting",
        text: `Hello!\n 
        You have been invited to the meeting ${meetingName} by ${sender}\n`,
    };
    try {
        yield sgMail.send(mailOptions);
    }
    catch (error) {
        console.log(error);
        throw error.message;
    }
});
module.exports = {
    invitationNotificationEmail,
};
