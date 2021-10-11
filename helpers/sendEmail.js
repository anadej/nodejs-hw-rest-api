const sgMail = require("");
const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = {
      ...data,
      from: SENDGRID_EMAIL,
    };
    const result = await sgMail.send(email);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
