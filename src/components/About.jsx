import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Stethoscope, Dna, Activity } from 'lucide-react';
import styles from './About.module.css';

const floatingIcons = [
  { Icon: HeartPulse, top: '10%', left: '-10%', delay: 0 },
  { Icon: Stethoscope, top: '70%', left: '-5%', delay: 1 },
  { Icon: Dna, top: '20%', right: '-10%', delay: 2 },
  { Icon: Activity, bottom: '10%', right: '-5%', delay: 0.5 },
];

const About = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={`container ${styles.aboutContainer}`}>
        
        {/* Left Side: Image with Floating Icons */}
        <div className={styles.imageWrapper}>
          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Modern Hospital Building" 
              className={styles.hospitalImage} 
            />
            
            {/* Floating Icons around image */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                className={`glass-panel ${styles.floatingIconBox}`}
                style={{
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  bottom: item.bottom,
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay
                }}
              >
                <item.Icon size={24} className={styles.iconColor} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Text & Glass Card */}
        <div className={styles.contentWrapper}>
          <motion.div
            className={`glass-panel ${styles.contentCard}`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className={styles.sectionSubtitle}>About Us</h4>
            <h2 className={styles.sectionTitle}>
              Pioneering <span className="text-gradient">Medical Excellence</span>
            </h2>
            <p className={styles.description}>
              Dr. Ramya's Multi Speciality Hospital is committed to compassionate, affordable, and advanced healthcare. 
              Equipped with experienced doctors, modern technology, and a patient-first treatment philosophy, 
              we ensure that you receive the highest standard of care in a luxurious and healing environment.
            </p>
            <ul className={styles.featureList}>
              <li>
                <div className={styles.checkIcon}></div>
                State-of-the-art Technology
              </li>
              <li>
                <div className={styles.checkIcon}></div>
                Award-winning Specialists
              </li>
              <li>
                <div className={styles.checkIcon}></div>
                24/7 Emergency Care
              </li>
            </ul>
            <button className={`btn-primary ${styles.learnMoreBtn}`}>
              Learn More
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
