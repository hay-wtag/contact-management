import React,{useRef} from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
const ContactList = (props) => {
  const inputE1 = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const renderContactlist = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteContactHandler}
        key={contact.id}
      />
    );
  });
  const getSearchterm = () => {
props.searchKeyWord(inputE1.current.value)
  };
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui right floated primary button">
            Add contact
          </button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            ref={inputE1}
            placeholder="Search contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchterm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactlist.length >0 ? renderContactlist: "No avialbale contact"}</div>
    </div>
  );
};

export default ContactList;
