import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config();

const sendGridApiKey = process.env.SEND_GRID_API_KEY!;

sgMail.setApiKey(sendGridApiKey);

export const invitationNotificationEmail = async (
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
