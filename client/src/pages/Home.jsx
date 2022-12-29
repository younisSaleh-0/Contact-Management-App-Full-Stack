import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./Home.scss";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";

import { fetchContacts, deleteContact, getContact } from "../redux/api";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const contacts = await fetchContacts();
      setContacts(contacts);
    };
    fetchData();
  }, [contacts]);

  // Handle deleting a contact
  const handleDeleteContact = async (id) => {
    await deleteContact(id);
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Handle searching for a contact
  const handleSearchSubmit = async (searchTerm) => {
    const contact = await getContact(searchTerm);
    setContacts([contact]);
  };

  return (
    <div className="home__container">
      <div className="add__contact-container">
        {/* added input field for search */}
        <form onSubmit={handleSearchSubmit}>
          <div className="search__input">
            <SearchIcon className="search__input-icon icon" />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        {/* Add button and navigation to add component */}
        <div className="add__contact-button">
          <AddBoxIcon className="icon" />
          <Link to="/add">
            <button className="btn btn-primary">Add Contact</button>
          </Link>
        </div>
      </div>

      {/* modified the table to only display contacts that match the search query */}
      {contacts === undefined || contacts.length === 0 ? (
        <p>No contacts</p>
      ) : (
        <div className="contacts__table-container">
          <table className="table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>#</th>
                <th style={{ textAlign: "center" }}>Image</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Contact</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {contacts
                .filter(
                  (contact) =>
                    contact.firstName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    contact.lastName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    contact.email
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    contact.number
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map(
                  (
                    { firstName, lastName, email, number, image, _id },
                    index
                  ) => (
                    <tr key={_id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img src={image} alt="user image" />
                      </td>
                      <td>
                        {firstName} {lastName}
                      </td>
                      <td>{email}</td>
                      <td>{number}</td>
                      <td className="actions_btn">
                        <Link to={`update/${_id}`}>
                          <button className="btn btn-edit">Edit</button>
                        </Link>
                        <Link
                          to={`/`}
                          onClick={() => {
                            handleDeleteContact(_id);
                          }}
                        >
                          <button className="btn btn-delete">Delete</button>
                        </Link>
                        <Link to={`view/${_id}`}>
                          <button className="btn btn-view">View</button>
                        </Link>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
