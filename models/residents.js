const { DataTypes } = require('sequelize');
const db = require('../database');
const Address = require('./address');

const Resident = db.define('resident', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  debt: {
    type: DataTypes.NUMERIC,
    allowNull: false
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'addresses',
      key: 'id'
    }
  }
}, {
  timestamps: false
});

Resident.belongsTo(Address, { foreignKey: 'address_id' });

module.exports = Resident;