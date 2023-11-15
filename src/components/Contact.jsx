import React from "react";
import { useState } from "react";
const Contact = () => {
  const [messageFormData, setMessageFormData] = useState({
    user: "",
    messageEmail: "",
    message: "",
  });
  function handleChange(event){
    const { name, value } = event.target;
    setMessageFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault()
    setMessageFormData({
      user: "",
      messageEmail: "",
      message: "",
    });
  }
  return (
    <section id="contacts" className="container">
      <form
        action="/home"
        method="post"
        className="row d-flex justify-content-center align-content-center"
      >
        <h1 className="text-center">Contact us</h1>
        <div className="form-group m-0 mt-2">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="user"
            placeholder="Enter Name"
            onChange={handleChange}
            value={messageFormData.user}
            required
          />
        </div>
        <div className="form-group m-0 mt-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="messageEmail"
            placeholder="Enter Name"
            onChange={handleChange}
            value={messageFormData.messageEmail}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="texareaMessage">How can we help you</label>
          <textarea
            className="form-control"
            id="texareaMessage"
            rows="4"
            name="message"
            placeholder="Enter message"
            onChange={handleChange}
            value={messageFormData.message}
            required
          ></textarea>
        </div>
        <button type="submit" className="mt-3 btn btn-secondary submitformBtn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Contact;
