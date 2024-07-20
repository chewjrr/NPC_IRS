const { Op } = require('sequelize');
const Resident = require('../models/residents');

const createResident = async (req, res) => {
  try {
    const newResident = await Resident.create(req.body);
    res.json(newResident);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllResidents = async (req, res) => {
  const residents = await Resident.findAll();
  res.json(residents);
};


const getResidentById = async (req, res) => {
  const { id } = req.params;
  const resident = await Resident.findByPk(id);

  if (!resident) {
    return res.status(404).json({ error: 'Resident not found' });
  }

  res.json(resident);
};

const updateResident = async (req, res) => {
  const { id } = req.params;
  await Resident.update(req.body, { where: { id } });
  res.json({ message: 'Resident updated successfully' });
};

const deleteResident = async (req, res) => {
  const { id } = req.params;
  await Resident.destroy({ where: { id } });
  res.json({ message: 'Resident deleted successfully' });
};


module.exports = {
  createResident,
  getAllResidents,
  getResidentById,
  updateResident,
  deleteResident
};
