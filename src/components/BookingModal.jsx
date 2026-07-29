import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './BookingModal.module.css';

const departments = [
  'General Medicine', 'Orthopedics', 'Neurology', 'Cardiology',
  'Gynecology', 'Pediatrics', 'Dermatology', 'Nephrology',
  'Physiotherapy', 'Radiology', 'Emergency Medicine'
];

const doctors = [
  'Any Available Doctor',
  'Dr. Sarah Mitchell (Cardiology)',
  'Dr. James Wilson (Neurology)',
  'Dr. Emily Chen (Pediatrics)'
];

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
    emergency: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile Number is required';
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.department) newErrors.department = 'Please select a department';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment. Please try again.');
      }

      setIsSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '', mobile: '', email: '', department: '',
      doctor: '', date: '', time: '', reason: '', emergency: false
    });
    setIsSuccess(false);
    setSubmitError('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          {/* Backdrop Blur */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className={`glass-panel ${styles.modalContainer}`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={24} />
            </button>

            {isSuccess ? (
              <motion.div 
                className={styles.successState}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className={styles.successIconWrapper}>
                  <CheckCircle size={64} className={styles.successIcon} />
                </div>
                <h2 className={styles.successTitle}>Appointment Booked Successfully!</h2>
                <p className={styles.successMessage}>
                  A confirmation email has been sent to <strong>{formData.email}</strong>.
                  <br />Our team will contact you shortly.
                </p>
                <div className={styles.successActions}>
                  <button className={`btn-primary ${styles.actionBtn}`} onClick={handleReset}>
                    Return Home
                  </button>
                  <button className={`glass-panel ${styles.secondaryBtn}`} onClick={() => setIsSuccess(false)}>
                    Book Another
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className={styles.formState}>
                <h2 className={styles.modalTitle}>
                  Book an <span className="text-gradient">Appointment</span>
                </h2>
                
                {submitError && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={18} />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                  
                  {/* Grid Layout for Form Fields */}
                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <input 
                        type="text" 
                        name="name" 
                        id="name"
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder=" "
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      />
                      <label htmlFor="name" className={styles.label}>Full Name *</label>
                      {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                      <input 
                        type="tel" 
                        name="mobile"
                        id="mobile"
                        value={formData.mobile} 
                        onChange={handleChange} 
                        placeholder=" "
                        className={`${styles.input} ${errors.mobile ? styles.inputError : ''}`}
                      />
                      <label htmlFor="mobile" className={styles.label}>Mobile Number *</label>
                      {errors.mobile && <span className={styles.errorText}>{errors.mobile}</span>}
                    </div>

                    <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                      <input 
                        type="email" 
                        name="email"
                        id="email"
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder=" "
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      />
                      <label htmlFor="email" className={styles.label}>Email Address *</label>
                      {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                      <select 
                        name="department" 
                        value={formData.department} 
                        onChange={handleChange}
                        className={`${styles.select} ${errors.department ? styles.inputError : ''}`}
                      >
                        <option value="" disabled>Preferred Department *</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.department && <span className={styles.errorText}>{errors.department}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                      <select 
                        name="doctor" 
                        value={formData.doctor} 
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="" disabled>Preferred Doctor (Optional)</option>
                        {doctors.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div className={styles.inputGroup}>
                      <div className={styles.inputIconWrapper}>
                        <Calendar size={18} className={styles.inputIcon} />
                        <input 
                          type="date" 
                          name="date"
                          value={formData.date} 
                          onChange={handleChange} 
                          className={`${styles.input} ${styles.withIcon} ${errors.date ? styles.inputError : ''}`}
                        />
                      </div>
                      {errors.date && <span className={styles.errorText}>{errors.date}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                      <div className={styles.inputIconWrapper}>
                        <Clock size={18} className={styles.inputIcon} />
                        <input 
                          type="time" 
                          name="time"
                          value={formData.time} 
                          onChange={handleChange} 
                          className={`${styles.input} ${styles.withIcon} ${errors.time ? styles.inputError : ''}`}
                        />
                      </div>
                      {errors.time && <span className={styles.errorText}>{errors.time}</span>}
                    </div>

                    <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                      <textarea 
                        name="reason"
                        id="reason"
                        value={formData.reason} 
                        onChange={handleChange} 
                        placeholder=" "
                        rows="3"
                        className={styles.textarea}
                      />
                      <label htmlFor="reason" className={styles.label}>Reason for Visit (Optional)</label>
                    </div>
                  </div>

                  <div className={styles.toggleGroup}>
                    <label className={styles.toggleLabel}>Emergency?</label>
                    <div className={styles.toggleWrapper}>
                      <input 
                        type="checkbox" 
                        name="emergency"
                        checked={formData.emergency}
                        onChange={handleChange}
                        className={styles.toggleInput}
                        id="emergencyToggle"
                      />
                      <label htmlFor="emergencyToggle" className={styles.toggleSlider}></label>
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button type="button" className={`glass-panel ${styles.cancelBtn}`} onClick={onClose} disabled={isSubmitting}>
                      Cancel
                    </button>
                    <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={isSubmitting}>
                      {isSubmitting ? <span className={styles.loader}></span> : 'Confirm Booking'}
                    </button>
                  </div>

                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
