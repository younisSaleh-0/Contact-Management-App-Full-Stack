import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getContact, updateContact } from "../redux/api";
import { useNavigate } from "react-router-dom";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const contact = await getContact(id);
      setContact(contact);
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setEmail(contact.email);
      setNumber(contact.number);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateContact(id, { firstName, lastName, email, number });
    navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <button type="submit">Save</button>
    </form>
  );
};

export default EditContact;
