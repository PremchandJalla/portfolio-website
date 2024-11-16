import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2>Contact Me</h2>
      <div className="contact-content">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>Feel free to reach out to me for any inquiries or collaboration opportunities.</p>
          <div className="contact-details">
            <p><i className="fas fa-envelope"></i> email@example.com</p>
            <p><i className="fas fa-phone"></i> +1 234 567 890</p>
          </div>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact; 