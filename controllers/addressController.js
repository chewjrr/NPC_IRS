const Address = require('../models/address');

const createAddress = async (req, res) => {
  try {
    const newAddress = await Address.create(req.body);
    res.json(newAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAddressById = async (req, res) => {
  const { id } = req.params;
  const address = await Address.findByPk(id);

  if (!address) {
    return res.status(404).json({ error: 'Address not found' });
  }

  res.json(address);
};

const updateAddress = async (req, res) => {
  const { id } = req.params;
  await Address.update(req.body, { where: { id } });
  res.json({ message: 'Address updated successfully' });
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  await Address.destroy({ where: { id } });
  res.json({ message: 'Address deleted successfully' });
};

const getAllAddresses = async (req, res) => {
  try {
    const allAddresses = await Address.findAll();
    res.json(allAddresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  getAllAddresses
};
