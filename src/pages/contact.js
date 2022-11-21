import React, { useRef } from "react";
import "../components/styles/contact.css";

function Contact() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };
    alert("mhhh!: \n" + JSON.stringify(data) + "Your data 😎");
  };
  return (
    <div className="container">
      <h1>Contact us</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="name">
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="firstName"
            placeholder="First name"
            ref={firstNameRef}
            tabindex="1"
          />

          <input
            type="text"
            id="lastName"
            className="lastName"
            placeholder="Last name"
            ref={lastNameRef}
            tabindex="2"
          />
        </div>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="email"
          placeholder="example@docs.com"
          ref={emailRef}
          tabindex="3"
        />

        <label for="message">Message</label>
        <textarea
          placeholder="Start typing..."
          className="message"
          name="message"
          ref={messageRef}
        ></textarea>
        <button type="submit" className="send">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
