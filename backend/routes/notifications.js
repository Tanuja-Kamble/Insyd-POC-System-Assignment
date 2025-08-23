// backend/routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a notification
router.post('/', async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const notif = await Notification.create({ userId, message, type });
    return res.status(201).json({ ok: true, notification: notif });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifs = await Notification.find().populate('userId');
    res.json({ ok: true, notifications: notifs });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
