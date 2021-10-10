const { Contact } = require("../../models");
const { sendResponse } = require("../../helpers");

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: req.user._id }, "", {
    skip,
    limit: +limit,
  }).populate("owner", "_id email");
  sendResponse({ res, data: { result } });
};
module.exports = getAll;
