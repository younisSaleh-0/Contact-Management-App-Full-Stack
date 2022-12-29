import express from "express";
const router = express.Router();

import ContactController from "../controllers/contactController.js";
import multer from "multer";

// Use the multer middleware to handle a single file with the field name 'image'
const upload = multer().single("photo");

// Create a new contact
router.post("/", upload, ContactController.createContact);

// Get a list of all contacts
router.get("/", ContactController.getAllContacts);

// Get a single contact by ID
router.get("/:id", ContactController.getContactById);

// Update a contact by ID
router.put("/:id", ContactController.updateContactById);

// Delete a contact by ID
router.delete("/:id", ContactController.deleteContactById);

export default router;

