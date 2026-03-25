const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Car = require('./car');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  carId: {
    type: DataTypes.INTEGER,
    references: {
      model: Car,
      key: 'id'
    },
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending'
  }
}, {
  tableName: 'bookings',
  timestamps: true
});

// Optional: define associations
User.hasMany(Booking, { foreignKey: 'userId' });
Car.hasMany(Booking, { foreignKey: 'carId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Car, { foreignKey: 'carId' });

module.exports = Booking;
