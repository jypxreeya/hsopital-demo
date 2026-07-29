import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Link as LinkIcon, MessageCircle, Mail } from 'lucide-react';
import styles from './Doctors.module.css';

const doctors = [
  {
    name: 'Dr. Sarah Mitchell',
    qualification: 'MD, DM Cardiology',
    speciality: 'Chief Cardiologist',
    experience: '15+ Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    offsetY: 40
  },
  {
    name: 'Dr. James Wilson',
    qualification: 'MS, MCh Neurosurgery',
    speciality: 'Senior Neurosurgeon',
    experience: '20+ Years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    offsetY: 0
  },
  {
    name: 'Dr. Emily Chen',
    qualification: 'MD Pediatrics',
    speciality: 'Head of Pediatrics',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1594824436998-d14a60e0a501?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    offsetY: 40
  }
];

const Doctors = ({ onBook }) => {
  return (
    <section id="doctors" className={styles.doctorsSection}>
      <div className={`container`}>
        <div className={styles.header}>
          <h4 className={styles.sectionSubtitle}>Medical Experts</h4>
          <h2 className={styles.sectionTitle}>
            Meet Our <span className="text-gradient">Specialists</span>
          </h2>
        </div>

        <div className={styles.doctorsContainer}>
          {doctors.map((doctor, index) => (
            <motion.div 
              key={index} 
              className={styles.doctorCardWrapper}
              style={{ marginTop: `${doctor.offsetY}px` }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`glass-panel ${styles.doctorCard}`}>
                
                {/* Image Frame */}
                <div className={styles.imageFrame}>
                  <div className={styles.glowingRing}></div>
                  <img src={doctor.image} alt={doctor.name} className={styles.doctorImage} />
                  
                  {/* Social Icons (appear on hover) */}
                  <div className={styles.socialOverlay}>
                    <a href="#" className={styles.socialIcon}><LinkIcon size={18} /></a>
                    <a href="#" className={styles.socialIcon}><MessageCircle size={18} /></a>
                    <a href="#" className={styles.socialIcon}><Mail size={18} /></a>
                  </div>
                </div>

                {/* Details */}
                <div className={styles.doctorInfo}>
                  <h3 className={styles.doctorName}>{doctor.name}</h3>
                  <div className={styles.qualification}>{doctor.qualification}</div>
                  
                  <div className={styles.specialityBadge}>
                    {doctor.speciality}
                  </div>
                  
                  <div className={styles.experience}>
                    <strong>Experience:</strong> {doctor.experience}
                  </div>
                </div>

                <button className={`btn-primary ${styles.bookBtn}`} onClick={onBook}>
                  <Calendar size={16} />
                  Book Appointment
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
