import { ContactModule } from "../modules/users.module";

const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModule.find({});

    if ((await contacts).length) {
      return res.status(200).json({ contacts: contacts });
    } else {
      return res.status(404).json({ message: "No Contacts found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error!", error });
  }
};

const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contactDetails = await ContactModule.findById(id);

    if (contactDetails) {
      res.status(200).json({ contact: contactDetails });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
};

const addContact = async (req, res) => {
  try {
    const { contactData } = req.body;
    const { name, email, phone } = contactData;

    const newContact = {
      name,
      email,
      phone,
      created_Date: Date.now(),
    };

    const ContactDocument = new ContactModule(newContact);

    const createdContact = await ContactDocument.save();

    const contacts = await ContactModule.find({});

    if ((await contacts).length) {
      res.status(201).json({ contacts: contacts });
    } else {
      res.status(404).json({ message: "No Contacts found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
};

const editContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { contactData } = req.body;

    const foundContact = await ContactModule.findById(id);
    if (foundContact) {
      const newContactDetails = {
        ...contactData,
      };

      const updatedContact = await ContactModule.findByIdAndUpdate(
        id,
        newContactDetails,
        {
          new: true,
        }
      );

      if (updatedContact) {
        const contacts = await ContactModule.find({});

        if ((await contacts).length) {
          res.status(201).json({ contacts: contacts });
        } else {
          res.status(400).json({ message: "Cannot update Contact" });
        }
      } else {
        res.status(400).json({ message: "Cannot update Contact" });
      }
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await ContactModule.findByIdAndDelete(id);

    if (deletedContact) {
      const contacts = await ContactModule.find({});

      if (await contacts) {
        res.status(200).json({ contacts: contacts });
      } else {
        res.status(400).json({ message: "Cannot delete Contact" });
      }
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e });
  }
};

export { getAllContacts, getContact, addContact, editContact, deleteContact };
