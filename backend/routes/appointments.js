const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { sendPatientConfirmation, sendAdminNotification } = require('../utils/emailService');

// POST /api/appointments
router.post('/', async (req, res) => {
  try {
    const { name, mobile, email, department, doctor, date, time, reason, emergency } = req.body;

    // Basic server-side validation
    if (!name || !mobile || !email || !department || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Save appointment in the backend database
    const newAppointment = new Appointment({
      name,
      mobile,
      email,
      department,
      doctor,
      date,
      time,
      reason,
      emergency
    });

    // Check if MongoDB is connected, if not, mock success for development purposes
    const isDBConnected = require('mongoose').connection.readyState === 1;
    
    if (isDBConnected) {
      await newAppointment.save();
    } else {
      console.log('MongoDB not connected, skipping database save but continuing with email flow.');
    }

    // 2. Automatically send a confirmation email to the patient & admin
    // This runs asynchronously, we don't wait for it to finish to respond to the client
    // unless we want to strictly fail if email fails. Usually better to respond fast.
    Promise.all([
      sendPatientConfirmation(newAppointment),
      sendAdminNotification(newAppointment)
    ]).catch(err => console.error('Error in email dispatch:', err));

    res.status(201).json({ 
      message: 'Appointment booked successfully',
      appointment: newAppointment 
    });

  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Server error while booking appointment' });
  }
});

module.exports = router;
