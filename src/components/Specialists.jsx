import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Bone, Brain, HeartPulse, Baby, Stethoscope, Droplets, Microscope, Syringe, Zap, ShieldPlus } from 'lucide-react';
import styles from './Specialists.module.css';

const departments = [
  { id: 'general', name: 'General Medicine', desc: 'Comprehensive care for all your primary health needs.', icon: Stethoscope },
  { id: 'ortho', name: 'Orthopedics', desc: 'Advanced treatment for bone and joint conditions.', icon: Bone },
  { id: 'neuro', name: 'Neurology', desc: 'Expert care for brain and nervous system disorders.', icon: Brain },
  { id: 'cardio', name: 'Cardiology', desc: 'State-of-the-art heart care and surgery.', icon: HeartPulse },
  { id: 'gyno', name: 'Gynecology', desc: 'Specialized healthcare for women of all ages.', icon: Baby },
  { id: 'pedia', name: 'Pediatrics', desc: 'Compassionate medical care for children.', icon: Baby },
];

const Specialists = () => {
  return (
    <section id="departments" className={styles.specialistsSection}>
      <div className={`container ${styles.headerContainer}`}>
        <h4 className={styles.sectionSubtitle}>Our Specialists</h4>
        <h2 className={styles.sectionTitle}>
          Advanced <span className="text-gradient">Departments</span>
        </h2>
        <p className={styles.description}>
          Explore our wide range of specialized medical departments, equipped with cutting-edge technology and staffed by expert professionals.
        </p>
      </div>

      <div className={`container ${styles.gridContainer}`}>
        {departments.map((dept, index) => (
          <motion.div 
            key={dept.id}
            className={`glass-panel ${styles.deptCard}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(11, 99, 206, 0.15)" }}
          >
            <div className={styles.iconCircle}>
              <dept.icon size={28} className={styles.deptIcon} />
            </div>
            <h3 className={styles.deptName}>{dept.name}</h3>
            <p className={styles.deptDesc}>{dept.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Specialists;
