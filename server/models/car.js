const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // your db connection

const Car = sequelize.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  carname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMERIC,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'cars',
  timestamps: true
});

module.exports = Car;
