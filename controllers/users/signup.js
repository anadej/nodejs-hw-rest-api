const { User } = require("../../models");
const { sendResponse } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    sendResponse({
      res,
      status: 409,
      statusMessage: "error",
      data: { message: "Email in use" },
    });
    return;
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  await User.create(newUser);
  sendResponse({
    res,
    status: 201,
    data: {
      message: "Registration success",
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
