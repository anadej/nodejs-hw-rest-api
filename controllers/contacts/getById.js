const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessReq(res, {
    result,
  });
};
module.exports = getById;
