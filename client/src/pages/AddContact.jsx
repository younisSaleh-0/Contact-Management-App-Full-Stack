import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact } from "../redux/api";
import "./AddContact.scss";

const AddContact = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !number || !image) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email address");
      return;
    }

    try {
      await createContact({ firstName, lastName, email, number, image });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          value={number}
          onChange={(event) => setNumber(event.target.value)}
        />
      </label>
      <br />
      <label>
        Image:
        <input type="text" onChange={(event) => setImage(event.target.value)} />
      </label>
      <br />

      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContact;
