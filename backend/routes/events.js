const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const queue = require('../inMemoryQueue');

router.post('/', async (req, res) => {
  try {
    const { type, sourceUserId, targetUserId, data } = req.body;
    const event = await Event.create({ type, sourceUserId, targetUserId, data });
    queue.push({ _id: event._id });
    return res.status(201).json({ ok: true, event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ ok: true, events });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
