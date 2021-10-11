const signup = require("./signup");
const signin = require("./signin");
const signout = require("./signout");
const currentUser = require("./currentUser");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const repeatVerify = require("./repeatVerify");

module.exports = {
  signup,
  signin,
  signout,
  currentUser,
  updateAvatar,
  verify,
  repeatVerify,
};
