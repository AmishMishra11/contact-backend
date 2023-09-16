import mongoose from "mongoose";

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  created_Date: Date,
});

const ContactModule = mongoose.model("Contact", contactSchema);

export { contactSchema, ContactModule };
