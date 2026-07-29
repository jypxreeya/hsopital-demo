const nodemailer = require('nodemailer');

const createTransporter = () => {
  // If no credentials are provided, return null to skip sending emails gracefully
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials missing. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });
};

const sendPatientConfirmation = async (appointment) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const mailOptions = {
    from: `"Dr. Ramya's Multi Speciality Hospital" <${process.env.EMAIL_USER}>`,
    to: appointment.email,
    subject: "Appointment Confirmation - Dr. Ramya's Multi Speciality Hospital",
    html: `
      <div style="font-family: Arial, sans-serif; color: #172A3A; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0B63CE;">Appointment Confirmation</h2>
        <p>Dear ${appointment.name},</p>
        <p>Thank you for booking your appointment with Dr. Ramya's Multi Speciality Hospital.</p>
        
        <div style="background: #F8FBFD; padding: 20px; border-radius: 8px; border-left: 4px solid #36C2FF; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0B63CE;">Appointment Details</h3>
          <p><strong>Name:</strong> ${appointment.name}</p>
          <p><strong>Department:</strong> ${appointment.department}</p>
          <p><strong>Doctor:</strong> ${appointment.doctor}</p>
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Reason:</strong> ${appointment.reason || 'N/A'}</p>
        </div>

        <h3 style="color: #0B63CE;">Hospital Address:</h3>
        <p>
          No.4, Ponniamman Kovil Street,<br>
          Kundrathur,<br>
          Chennai – 600069
        </p>

        <p><strong>Emergency Contact:</strong> 07448867448</p>
        <p style="color: #FF3B30; font-weight: bold;">Please arrive 15 minutes before your scheduled appointment.</p>
        
        <p>Thank you for choosing Dr. Ramya's Multi Speciality Hospital.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${appointment.email}`);
  } catch (error) {
    console.error('Error sending patient email:', error);
  }
};

const sendAdminNotification = async (appointment) => {
  const transporter = createTransporter();
  if (!transporter) return;

  // Assume admin email is the same as the authenticated user for now
  const adminEmail = process.env.EMAIL_USER;

  const mailOptions = {
    from: `"Hospital Booking System" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `New Appointment Request: ${appointment.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #172A3A; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0B63CE;">New Appointment Request</h2>
        <p>A new appointment has been booked.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Patient Name:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${appointment.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Mobile:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${appointment.mobile}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${appointment.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Department:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${appointment.department}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Doctor:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${appointment.doctor}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${appointment.date}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${appointment.time}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Reason:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${appointment.reason || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Emergency:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd; color: ${appointment.emergency ? '#FF3B30' : 'inherit'};">
              <strong>${appointment.emergency ? 'Yes' : 'No'}</strong>
            </td>
          </tr>
        </table>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent');
  } catch (error) {
    console.error('Error sending admin email:', error);
  }
};

module.exports = {
  sendPatientConfirmation,
  sendAdminNotification
};
