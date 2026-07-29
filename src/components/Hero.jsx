import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, CalendarCheck, Activity, HeartPulse } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = ({ onBook }) => {
  return (
    <section id="home" className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Left Side: Typography and CTA */}
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className={styles.headline}>
              Healing Hands.<br />
              <span className="text-gradient">Caring Hearts.</span>
            </h1>
            
            <p className={styles.subheadline}>
              <strong>24x7 Multi Speciality Hospital</strong><br/>
              Premium healthcare for your family. Experience the future of medical excellence and compassionate care.
            </p>
          </motion.div>

          <motion.div 
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className={`btn-primary ${styles.bookBtn}`} onClick={onBook}>
              <CalendarCheck size={20} />
              Book Appointment
            </button>
            <button className={`glass-panel ${styles.callBtn}`}>
              <PhoneCall size={20} className={styles.callIcon} />
              Emergency Call
            </button>
          </motion.div>

          <motion.div 
            className={styles.trustBadge}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className={styles.stars}>★★★★★</div>
            <div className={styles.ratingText}>
              <strong>4.7 Google Rating</strong>
              <span>(38+ Reviews)</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.status}>
              <div className={styles.statusDot}></div>
              Open 24 Hours
            </div>
          </motion.div>
        </div>

        {/* Right Side: Premium 2D Composition */}
        <div className={styles.heroVisual}>
          <motion.div 
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className={styles.glowCircle}></div>
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Modern Hospital and Doctors" 
              className={styles.heroImage}
            />
            
            {/* Floating Glass Badges */}
            <motion.div 
              className={`glass-panel ${styles.floatingBadge} ${styles.badgeLeft}`}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className={styles.iconCircle}><Activity size={20} color="#0B63CE" /></div>
              <div>
                <strong>Advanced Tech</strong>
                <span>Latest Equipment</span>
              </div>
            </motion.div>

            <motion.div 
              className={`glass-panel ${styles.floatingBadge} ${styles.badgeRight}`}
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <div className={styles.iconCircle}><HeartPulse size={20} color="#FF3B30" /></div>
              <div>
                <strong>Expert Care</strong>
                <span>Top Specialists</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
