const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({owner}, {skip, limit})
                              .populate("owner", "name email");

  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(404).json({
      message: "missing fields",
    });
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateFavourite = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(404).json({
      message: "missing field favorite",
    });
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavourite: ctrlWrapper(updateFavourite),
  deleteById: ctrlWrapper(deleteById),
};
