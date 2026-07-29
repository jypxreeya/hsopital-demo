import React from 'react';
import { UserCheck, IndianRupee, Clock, Zap, HeartHandshake, ShieldCheck } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const reasons = [
  { icon: UserCheck, title: 'Experienced Doctors' },
  { icon: IndianRupee, title: 'Affordable Treatment' },
  { icon: Clock, title: '24×7 Emergency' },
  { icon: Zap, title: 'Modern Equipment' },
  { icon: HeartHandshake, title: 'Patient-Centered Care' },
  { icon: ShieldCheck, title: 'Fast Diagnosis' },
];

const WhyChooseUs = () => {
  return (
    <section className={styles.whySection}>
      <div className={`container`}>
        <div className={styles.header}>
          <h4 className={styles.sectionSubtitle}>Why Choose Us</h4>
          <h2 className={styles.sectionTitle}>
            The <span className="text-gradient">Premium Choice</span> for Healthcare
          </h2>
        </div>

        <div className={styles.cubeGrid}>
          {reasons.map((reason, index) => (
            <div key={index} className={styles.cubeScene}>
              <div className={styles.cube}>
                {/* Front Face */}
                <div className={`${styles.cubeFace} ${styles.cubeFaceFront} glass-panel`}>
                  <div className={styles.iconWrapper}>
                    <reason.icon size={32} className={styles.icon} />
                  </div>
                  <h3 className={styles.cubeTitle}>{reason.title}</h3>
                </div>
                {/* Right Face (Revealed on hover) */}
                <div className={`${styles.cubeFace} ${styles.cubeFaceRight} glass-panel`}>
                  <div className={styles.iconWrapper}>
                    <reason.icon size={32} className={styles.icon} />
                  </div>
                  <p className={styles.cubeDesc}>We ensure the highest standards for {reason.title.toLowerCase()}.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
