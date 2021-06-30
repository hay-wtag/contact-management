import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { uuid } from "uuidv4";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetails from "./ContactDetails";
import api from "../api/contacts";
import EditContact from "./EditContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // const LOCAL_STORAGE_KEY = "contacts";

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    // console.log(response.data)
    return response.data;
  };

  const addContactHandler = async (contact) => {
    // console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("./contacts", request);

    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm!== ""){
      const newContactList = contacts.filter((contact) =>{
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      })
      setSearchResult(newContactList)
    } else{
      setSearchResult(contacts);
    }
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) {
    //   setContacts(retriveContacts);
    // }
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      console.log(allContacts);
      if (allContacts) {
        setContacts(allContacts);
      } else {
        alert("contacts not found");
      }
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length<1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyWord={searchHandler}
              />
            )}
          ></Route>

          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          ></Route>
          <Route path="/contact/:id" component={ContactDetails}></Route>
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          ></Route>
          <Route path="/contact/:id" component={ContactDetails}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
