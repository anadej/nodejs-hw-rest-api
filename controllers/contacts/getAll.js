const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find({});
  sendSuccessReq(res, { result });
};
module.exports = getAll;
