import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, MessageCircle } from 'lucide-react';
import styles from './EmergencyCTA.module.css';

const EmergencyCTA = () => {
  return (
    <section id="contact" className={styles.ctaSection}>
      <div className={styles.backgroundGlow}></div>
      <div className={styles.particlesOverlay}></div>
      
      <div className={`container ${styles.ctaContainer}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={styles.contentWrapper}
        >
          <div className={styles.pulseIcon}>
            <PhoneCall size={32} />
          </div>
          
          <h2 className={styles.headline}>
            Emergency Available 24×7
          </h2>
          <p className={styles.subheadline}>
            Our rapid response team is always ready. Get immediate medical attention when seconds matter.
          </p>

          <div className={styles.actionButtons}>
            <button className={`btn-primary ${styles.hugeCallBtn}`}>
              <PhoneCall size={24} />
              Call Now: 1066
            </button>
            <button className={styles.whatsappBtn}>
              <MessageCircle size={24} />
              WhatsApp Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmergencyCTA;
