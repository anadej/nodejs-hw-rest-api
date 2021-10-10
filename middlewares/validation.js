const sendResponse = require("../helpers");

const validation = (shema) => {
  const func = (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      sendResponse({
        res,
        status: 400,
        statusMessage: "Bad request",
        data: {
          message: error.message,
        },
      });
    }
    next();
  };
  return func;
};

module.exports = validation;
