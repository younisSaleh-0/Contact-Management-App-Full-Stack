// ViewContact.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContact } from "../redux/api";
import "./ViewContact.scss";

const ViewContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const contact = await getContact(id);
      setContact(contact);
    };
    fetchData();
  }, [id]);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div className="view">
      <div className="view__header">
        <h3>Contact Information</h3>
      </div>
      <div className="view__body">
        <div className="view__image">
          <img src={contact.image} alt={contact.name} />
        </div>
        <div className="view__info">
          <h4>{contact.name}</h4>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.number}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
