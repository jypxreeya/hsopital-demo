import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Beaker, Pill, Stethoscope, Bed, HeartPulse } from 'lucide-react';
import styles from './Facilities.module.css';

const facilities = [
  { name: 'ICU', icon: Activity, desc: 'Advanced intensive care unit with 24/7 monitoring.' },
  { name: 'Emergency', icon: HeartPulse, desc: 'Rapid response emergency department.' },
  { name: 'Operation Theatre', icon: Stethoscope, desc: 'State-of-the-art modular operation theatres.' },
  { name: 'X-Ray & Imaging', icon: Bed, desc: 'High-resolution diagnostic imaging.' },
  { name: 'Laboratory', icon: Beaker, desc: 'Fully automated pathology lab.' },
  { name: 'Pharmacy', icon: Pill, desc: '24 Hours in-house pharmacy.' },
];

const Facilities = () => {
  return (
    <section id="facilities" className={styles.facilitiesSection}>
      <div className="container">
        <div className={styles.header}>
          <h4 className={styles.sectionSubtitle}>World Class Facilities</h4>
          <h2 className={styles.sectionTitle}>
            Modern <span className="text-gradient">Infrastructure</span>
          </h2>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack}>
            {facilities.map((facility, index) => (
              <motion.div 
                key={index} 
                className={`glass-panel ${styles.facilityCard}`}
                whileHover={{ 
                  rotateY: 15, 
                  rotateX: -10, 
                  scale: 1.05,
                  z: 50,
                  boxShadow: "0 20px 40px rgba(11, 99, 206, 0.2)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={styles.iconHologram}>
                  <facility.icon size={48} className={styles.icon} />
                  <div className={styles.hologramBase}></div>
                </div>
                <h3 className={styles.facilityName}>{facility.name}</h3>
                <p className={styles.facilityDesc}>{facility.desc}</p>
                {facility.name === 'Pharmacy' && (
                  <span className={styles.badge}>24 Hours</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
