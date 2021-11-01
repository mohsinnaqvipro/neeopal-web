const connectToDatabase = require("./dbConnection");

exports.addItem = async (model, data) => {
  const { sequelize, Sequelize } = await connectToDatabase();
  const modelName = await require("../models/" + model);
  const modelObj = await modelName(sequelize, Sequelize);
  const newInstance = new modelObj(data);
  const modelData = await newInstance.save(data);
  return modelData;
};
