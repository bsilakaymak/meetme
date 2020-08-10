const config = require("config");

const sendGridApiKey = process.env.SEND_GRID_API_KEY;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(sendGridApiKey);

const invitationNotificationEmail = async (
  meetingName: string,
  email: string[],
  sender: string
): Promise<any> => {
  const mailOptions = {
    to: email,
    from: "bsilakaymak@gmail.com",
    subject: "A new meeting",
    text: `Hello!\n 
        You have been invited to the meeting ${meetingName} by ${sender}\n`,
  };
  try {
    await sgMail.send(mailOptions);
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

module.exports = {
  invitationNotificationEmail,
};
