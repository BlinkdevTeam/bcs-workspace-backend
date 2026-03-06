"use strict";

require("./models"); // IMPORTANT: loads all Sequelize models

const app = require("./app");
const config = require("./config");
const { connectDB } = require("./config/database");

const start = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} [${config.env}]`);
  });
};

start();
