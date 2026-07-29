import React from 'react';
import { motion } from 'framer-motion';
import styles from './Statistics.module.css';

const stats = [
  { value: '4.7★', label: 'Google Rating' },
  { value: '24×7', label: 'Emergency' },
  { value: '10+', label: 'Specialities' },
  { value: '1000+', label: 'Happy Patients' }
];

const Statistics = () => {
  return (
    <section className={styles.statsSection}>
      <div className={`container ${styles.statsGrid}`}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`glass-panel ${styles.statCard}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.05 }}
          >
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
