import React, { Component } from "react";


class ThankYouRedirectPage extends Component {
  render() {
    return (
      // USe conditional rendering to detrmine weather to display ev form or not
      <div>
        <h1>Thank you for your interest!</h1>
        <h2> We will get back to you shortly</h2>

        <p>
          Head to our website to learn more at <a href="https://wipomo-zoho-database.herokuapp.com/">Makello.com</a>.
        </p>
      </div>
    );
  }
}

export default ThankYouRedirectPage;