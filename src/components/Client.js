import React from 'react';
import "./Client.css";
import Avatar from "react-avatar";

const Client = ({userName}) => {
  return (
    <>
      {
        userName &&
        <div className="client">
          <Avatar name={userName} size={50} round="14px"/>
          <span className="username">{userName}</span>
        </div>
      }
    </>
  );
};

export default Client;
