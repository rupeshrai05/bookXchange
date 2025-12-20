const Address = require("./address.model");

exports.addAddress = async (userId, data) => {
  if (data.isDefault) {
    await Address.updateMany({ user: userId }, { isDefault: false });
  }

  return await Address.create({ ...data, user: userId });
};

exports.getUserAddresses = async (userId) => {
  return await Address.find({ user: userId });
};

exports.updateAddress = async (userId, addressId, data) => {
  const address = await Address.findOne({ _id: addressId, user: userId });
  if (!address) throw new Error("Address not found");

  if (data.isDefault) {
    await Address.updateMany({ user: userId }, { isDefault: false });
  }

  Object.assign(address, data);
  return await address.save();
};

exports.deleteAddress = async (userId, addressId) => {
  const address = await Address.findOneAndDelete({
    _id: addressId,
    user: userId,
  });

  if (!address) throw new Error("Address not found");
};
