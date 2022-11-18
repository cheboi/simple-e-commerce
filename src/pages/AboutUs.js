import React from "react";

import "../components/styles/AboutUs.css";
const AboutUs = () => {
  return (
    <div className="about-section">
      <h1>About Us Page</h1>
      <p>
        Minim aliquip eu mollit id commodo enim non. Adipisicing culpa tempor
        excepteur eu ad laboris commodo ad ea commodo irure. Eu laboris
        consequat Lorem ex consectetur consectetur duis tempor exercitation
        laboris. Cupidatat laborum minim est velit amet sunt reprehenderit
        cillum commodo consectetur reprehenderit eiusmod ex cillum. Tempor sit
        velit et et ad incididunt qui est non do. Veniam velit magna commodo
        sunt proident ad irure anim laborum duis. In minim sunt mollit
        incididunt anim id.
      </p>
      <h2 className="ourTeam">Our Team</h2>
      <div className="row">
        <div className="column">
          <div className="card">
            {/* <img src="" alt="Jane" style="width:100%" /> */}
            <div className="container">
              <h2>Moses Cheboi</h2>
              <p class="title">CEO & Founder</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>moseekenyaone@gmail.com</p>
              <p>
                <button className="button">Contact</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
