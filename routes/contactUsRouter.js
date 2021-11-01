const express = require("express");
const bodyParser = require("body-parser");
const dbHandler = require("../database/dbHandler");
const { response } = require("../helpers/response");
const { getErrorResponse } = require("../helpers/common");
const contactUsRouter = express.Router();
const joi = require("joi");

contactUsRouter.use(bodyParser.json());

contactUsRouter.route("/").post(async (req, res, next) => {
  let result;
  try {
    let data = JSON.stringify(req.body);
    let parseData = JSON.parse(data);
    console.log("Request Body: ", parseData);
    const { error } = saveFormSchema(parseData);
    if (error) {
      console.log("Enter in post request Error");
      return getErrorResponse(error, res);
    }

    result = await dbHandler.addItem("contactUs", parseData);
    return response(true, "Successfully Added", result, res);
  } catch (error) {
    console.log("Error = ", error);
    return response(false, "Faild to Save", error, res);
  }
});

const saveFormSchema = (user) => {
  let schema = joi
    .object({
      username: joi.string().required(),
      email: joi.string().email().required(),
      phoneNumber: joi.string().required(),
      question: joi.string().required(),
    })
    .options({
      abortEarly: false,
    });
  return schema.validate(user);
};

module.exports = contactUsRouter;
