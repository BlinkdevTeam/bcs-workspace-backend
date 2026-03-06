"use strict";

const User = require("../models/core/user");
const { sequelize } = require("../config/database");
const bcrypt = require("bcrypt"); // ← import bcrypt

// ─────────────────────────────────────────────
// CHECK SETUP STATUS
// ─────────────────────────────────────────────
exports.getSetupStatus = async (req, res, next) => {
  try {
    const admin = await User.findOne({
      where: { role: "super_admin" },
    });

    res.json({
      setupComplete: !!admin,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// CREATE INITIAL SETUP
// ─────────────────────────────────────────────
exports.createSetup = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { company, admin } = req.body;

    // 1️⃣ Check if setup already exists
    const existingAdmin = await User.findOne({
      where: { role: "super_admin" },
    });

    if (existingAdmin) {
      return res.status(403).json({
        success: false,
        message: "Setup already completed",
      });
    }

    // 2️⃣ Hash the password before saving
    const hashedPassword = await bcrypt.hash(admin.password, 10); // 10 = salt rounds

    // 3️⃣ Create super admin
    const newAdmin = await User.create(
      {
        email: admin.email,
        password_hash: hashedPassword, // ← save the hash, not plain text
        role: "super_admin",
        is_active: true,
      },
      { transaction: t },
    );

    await t.commit();

    res.json({
      success: true,
      message: "Setup complete",
      data: newAdmin,
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};
