import React from "react";

function improveMessage(message) {
  if (/ 400/.test(message)) {
    return "Please check the entered values";
  } else if (/ 401/.test(message)) {
    return "You must be signed in";
  } else if (/ 404/.test(message)) {
    return "Item not found!";
  } else if (/Network Error/i.test(message)) {
    return "Cannot connect to API server";
  }

  return message;
}

function Error({ error }) {
  return (
    <p className="alert alert-danger text-center" role="alert">
      {improveMessage(error.message)}
    </p>
  );
}

export default Error;
