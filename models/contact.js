const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKeys: false, timestamps: true});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  
const updateFavouriteSchema = Joi.object({
    favorite: Joi.boolean().required(),    
})  
   
const schemas = {
    addSchema,
    updateFavouriteSchema 
}
const Contact = model("contact", contactSchema)

module.exports = {
    Contact,
    schemas,
}; 
