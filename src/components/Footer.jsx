import React from 'react';
import { Link as LinkIcon, MessageCircle, Share2, Mail, Send } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        
        {/* Brand & Newsletter */}
        <div className={styles.brandSection}>
          <a href="#home" className={styles.logoGroup}>
            <div className={styles.logoIcon}>
              <div className={styles.circleInner}></div>
              <div className={styles.circleOuter}></div>
            </div>
            <span className={styles.logoText}>
              Dr. Ramya's <br />
              <span className="text-gradient">Multi Speciality</span>
            </span>
          </a>
          <p className={styles.brandDesc}>
            Premium healthcare services delivered with compassion and advanced technology.
          </p>
          
          <div className={styles.newsletter}>
            <h4 className={styles.footerHeading}>Subscribe to our Health Newsletter</h4>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Your email address" className={styles.input} />
              <button className={styles.submitBtn}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.linksSection}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#doctors">Our Doctors</a></li>
            <li><a href="#facilities">Facilities</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>

        {/* Departments */}
        <div className={styles.linksSection}>
          <h4 className={styles.footerHeading}>Departments</h4>
          <ul className={styles.linkList}>
            <li><a href="#departments">Cardiology</a></li>
            <li><a href="#departments">Neurology</a></li>
            <li><a href="#departments">Orthopedics</a></li>
            <li><a href="#departments">Pediatrics</a></li>
            <li><a href="#departments">Emergency Care</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className={styles.contactSection}>
          <h4 className={styles.footerHeading}>Emergency Contact</h4>
          <div className={styles.contactDetails}>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Emergency:</strong> 1066 (24/7)</p>
            <p><strong>Email:</strong> care@drramyashospital.com</p>
            <p><strong>Address:</strong> 123 Healthcare Avenue, Medical District, City - 500001</p>
          </div>
          
          <div className={styles.socialGroup}>
            <a href="#" className={styles.socialLink}><LinkIcon size={20} /></a>
            <a href="#" className={styles.socialLink}><MessageCircle size={20} /></a>
            <a href="#" className={styles.socialLink}><Share2 size={20} /></a>
            <a href="#" className={styles.socialLink}><Mail size={20} /></a>
          </div>
        </div>
        
      </div>
      
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Dr. Ramya's Multi Speciality Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
