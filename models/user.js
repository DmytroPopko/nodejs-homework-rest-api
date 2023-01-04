const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String
    },
    verify: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  }, {versionKeys: false, timestamps: true});

  userSchema.post("save", handleMongooseError);

  const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })

  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })

  const verfyEmailSchema = Joi.object({
    email: Joi.string().required(),
  })

  const schemas = {
    registerSchema,
    loginSchema,
    verfyEmailSchema
  }

  const User = model('user', userSchema);

  module.exports = {
    User,
    schemas
  }