import express from 'express';
import { sendEmail } from '../services/mailtrapService.js';

const router = express.Router();

// POST /emails/test
router.post('/test', async (req, res) => {
  try {
    const { to, subject, text, category } = req.body;
    
    // Validation
    if (!to || !subject || !text) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['to', 'subject', 'text'],
        received: { to: !!to, subject: !!subject, text: !!text }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ error: 'Invalid email format for "to" field' });
    }

    const result = await sendEmail(to, subject, text, category);
    res.json({ 
      success: true, 
      message: 'Email sent successfully',
      data: result 
    });
  } catch (err) {
    console.error('Email endpoint error:', err);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: err.message 
    });
  }
});

export default router;
