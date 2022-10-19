import axios from "axios";

export const getMail = async () => {
  const response = await axios.get("/api/inbox.json");
  return response.data;
};

export const getContact = async () => {
  const response = await axios.get("/api/contacts.json");
  return response.data;
};
