const { sendResponse, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const emailVerify = require("../../tpl/emailVerify");

const repeatVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return sendResponse({
      res,
      status: 404,
      statusMessage: "Not Found",
      data: {
        message: "User not found",
      },
    });
  }

  const { verify, verifyToken } = user;

  if (verify) {
    return sendResponse({
      res,
      status: 400,
      statusMessage: "Bad Request",
      data: {
        message: "Verification has already been passed",
      },
    });
  }

  const data = {
    to: email,
    subject: "Email verification",
    html: emailVerify(verifyToken, email),
  };

  await sendEmail(data);

  sendResponse({
    res,
    status: 200,
    data: {
      message: "Verification email sent",
    },
  });
};

module.exports = repeatVerify;
