import axios from "axios";

const baseURL = "http://localhost:3100";

export const fetchContacts = () => {
  return axios.get(`${baseURL}/contacts`).then((response) => response.data);
};


export const getContact = (id) => {
  return axios
    .get(`${baseURL}/contacts/${id}`)
    .then((response) => response.data);
};

export const createContact = (contact) => {
  return axios
    .post(`${baseURL}/contacts`, contact)
    .then((response) => response.data);
};

export const updateContact = (id, contact) => {
  return axios
    .put(`${baseURL}/contacts/${id}`, contact)
    .then((response) => response.data);
};

export const deleteContact = (id) => {
  return axios
    .delete(`${baseURL}/contacts/${id}`)
    .then((response) => response.data);
};
