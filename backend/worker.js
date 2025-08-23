const Event = require('./models/Event');
const Notification = require('./models/Notification');
const User = require('./models/User');
const queue = require('./inMemoryQueue');

function buildContent(event, sourceUser) {
  switch(event.type) {
    case 'like': return `${sourceUser?.username || 'Someone'} liked your post`;
    case 'comment': return `${sourceUser?.username || 'Someone'} commented: ${event.data?.text || ''}`;
    case 'follow': return `${sourceUser?.username || 'Someone'} started following you`;
    case 'post': return `${sourceUser?.username || 'Someone'} published a new post`;
    default: return 'You have a new notification';
  }
}

let running = false;

async function processOne() {
  const evt = queue.pop();
  if (!evt) return;
  try {
    const eventDoc = await Event.findById(evt._id).lean();
    if (!eventDoc) return;
    const sourceUser = eventDoc.sourceUserId ? await User.findById(eventDoc.sourceUserId).lean() : null;
    if (eventDoc.targetUserId) {
      const content = buildContent(eventDoc, sourceUser);
      await Notification.create({
        userId: eventDoc.targetUserId,
        type: eventDoc.type,
        content,
        metadata: { eventId: eventDoc._id }
      });
    }
  } catch (err) {
    console.error('Worker error', err);
  }
}

function startWorker() {
  if (running) return;
  running = true;
  setInterval(async () => {
    const batch = 5;
    for (let i = 0; i < batch; i++) await processOne();
  }, 500);
}

module.exports = { startWorker };
