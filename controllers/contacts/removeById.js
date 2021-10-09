const { Contact } = require("../../models/contact");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessReq(res, {
    result,
    message: "Success remove contact",
  });
};

module.exports = removeById;
