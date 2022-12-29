import multer from "multer";
import Contact from "../models/contactModel.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG and PNG are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

class ContactController {
  // Create a new contact
  static async createContact(req, res) {
    try {
      const { firstName, lastName, email, number, image } = req.body;

      const contact = new Contact({
        firstName,
        lastName,
        email,
        image,
        number,
      });

      const result = await contact.save();
      res.status(201).json({
        message: "Contact created successfully",
        contact: result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all contacts
  static async getAllContacts(req, res) {
    try {
      const contacts = await Contact.find().sort("firstName");
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a single contact by id
  static async getContactById(req, res) {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a contact by id
  static async updateContactById(req, res) {
    try {
      const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res
        .status(200)
        .json({ message: "Contact updated successfully", contact });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a contact by id
  static async deleteContactById(req, res) {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ContactController;
