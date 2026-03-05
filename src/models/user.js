"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type:         DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey:   true,
  },
  first_name: {
    type:      DataTypes.STRING,
    allowNull: false,
  },
  middle_name: {
    type:      DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type:      DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type:      DataTypes.STRING,
    allowNull: false,
    unique:    true,
  },
}, {
  tableName:  "users",
  timestamps: true,
});

module.exports = User;