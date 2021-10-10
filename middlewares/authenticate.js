const jwt = require("jsonwebtoken");
const sendResponse = require("../helpers/sendResponse");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    sendResponse({
      res,
      status: 401,
      statusMessage: "Unauthorized",
      data: {
        message: "Not authorized",
      },
    });
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    sendResponse({
      res,
      status: 401,
      statusMessage: "Unauthorized",
      data: {
        message: "Not authorized",
      },
    });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user.token) {
      sendResponse({
        res,
        status: 401,
        statusMessage: "Unauthorized",
        data: {
          message: "Not authorized",
        },
      });
    }
    req.user = user;
    next();
  } catch (error) {
    sendResponse({
      res,
      status: 401,
      statusMessage: "Unauthorized",
      data: {
        message: "Not authorized",
      },
    });
  }
};

module.exports = authenticate;
