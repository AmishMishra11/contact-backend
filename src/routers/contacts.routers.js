import express from "express";
import {
  addContact,
  deleteContact,
  editContact,
  getAllContacts,
  getContact,
} from "../controllers/contacts.controller";

const router = express.Router();

router.route("/").get(getAllContacts);
router.route("/:id").get(getContact);
router.route("/").post(addContact);
router.route("/:id").put(editContact);
router.route("/:id").delete(deleteContact);

export { router };
