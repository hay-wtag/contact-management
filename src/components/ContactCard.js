import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div className="">{email}</div>{" "}
        </Link>
      </div>
      <i
        style={{ color: "red", float: "right", marginLeft: "10px" }}
        className="trash alternate outline icon"
        onClick={() => props.clickHander(id)}
      ></i>
      <Link
        to={{ pathname: `/edit`, state: { contact: props.contact } }}
      >
        <i
          style={{ color: "green", float: "right" }}
          className="edit alternate outline icon"
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
