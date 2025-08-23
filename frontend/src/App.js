import React from 'react';
import NotificationList from './components/NotificationList';
import EventForm from './components/EventForm';

const MOCK_USER_ID = process.env.REACT_APP_MOCK_USER_ID || '';

function App(){
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Insyd — Notification POC</h2>
      <p>Set REACT_APP_MOCK_USER_ID in frontend/.env to a user _id to act as logged-in user.</p>
      <div style={{ display: 'flex', gap: 40 }}>
        <div style={{ flex: 1 }}>
          <EventForm userId={MOCK_USER_ID} />
        </div>
        <div style={{ flex: 1 }}>
          <NotificationList userId={MOCK_USER_ID} />
        </div>
      </div>
    </div>
  );
}

export default App;
