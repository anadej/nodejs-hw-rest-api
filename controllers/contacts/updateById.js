const { Contact } = require("../../models/contact");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found!`);
  }

  sendSuccessReq(res, { result });
};

module.exports = updateById;
