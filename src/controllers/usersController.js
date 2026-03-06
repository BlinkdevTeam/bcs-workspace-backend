"use strict";

const User = require("../models/core/user");

exports.getAll = async (_req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
