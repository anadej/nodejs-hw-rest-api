const { User } = require("../../models");
const { sendResponse } = require("../../helpers");

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    sendResponse({
      res,
      status: 401,
      statusMessage: "Unauthorized",
      data: { message: "Email or password is wrong" },
    });
    return;
  }
  const token = user.createToken();

  await User.findByIdAndUpdate(user._id, { token });

  sendResponse({
    res,
    status: 200,
    statusMessage: "Login success",
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = signin;
