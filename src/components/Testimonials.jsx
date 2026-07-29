import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const reviews = [
  { text: 'Highly recommended for quality treatment.', rating: '★★★★★', author: 'Rahul S.' },
  { text: 'Doctors are knowledgeable and caring.', rating: '★★★★★', author: 'Priya M.' },
  { text: 'Affordable treatment with world-class facilities.', rating: '★★★★★', author: 'Amit K.' },
  { text: 'Clean hospital and very professional staff.', rating: '★★★★★', author: 'Sneha R.' },
  { text: 'Best emergency care in the city. Fast and reliable.', rating: '★★★★★', author: 'Vikram T.' },
  { text: 'Highly recommended for quality treatment.', rating: '★★★★★', author: 'Rahul S.' }, // Duplicated for continuous scroll effect
];

const Testimonials = () => {
  return (
    <section id="testimonials" className={styles.testimonialSection}>
      <div className={`container ${styles.headerContainer}`}>
        <h4 className={styles.sectionSubtitle}>Patient Reviews</h4>
        <h2 className={styles.sectionTitle}>
          Stories of <span className="text-gradient">Healing</span>
        </h2>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {reviews.map((review, index) => (
            <div key={index} className={`glass-panel ${styles.reviewCard}`}>
              <Quote size={40} className={styles.quoteIcon} />
              <div className={styles.rating}>{review.rating}</div>
              <p className={styles.reviewText}>"{review.text}"</p>
              <h4 className={styles.author}>- {review.author}</h4>
            </div>
          ))}
          {/* Duplicate set for seamless looping */}
          {reviews.map((review, index) => (
            <div key={`dup-${index}`} className={`glass-panel ${styles.reviewCard}`}>
              <Quote size={40} className={styles.quoteIcon} />
              <div className={styles.rating}>{review.rating}</div>
              <p className={styles.reviewText}>"{review.text}"</p>
              <h4 className={styles.author}>- {review.author}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
