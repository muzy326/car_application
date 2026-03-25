const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Booking = require('./booking');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bookingId: {
    type: DataTypes.INTEGER,
    references: {
      model: Booking,
      key: 'id'
    },
    allowNull: false
  },
  amount: {
    type: DataTypes.NUMERIC,
    allowNull: false
  },
  method: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending'
  },
  paidAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'payments',
  timestamps: true
});

// Optional association
Booking.hasMany(Payment, { foreignKey: 'bookingId' });
Payment.belongsTo(Booking, { foreignKey: 'bookingId' });

module.exports = Payment;
