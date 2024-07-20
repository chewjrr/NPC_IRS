const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Address = sequelize.define('address', {
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});


module.exports = Address;
