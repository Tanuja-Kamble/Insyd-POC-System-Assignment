import React, { useState } from 'react';
import API from '../api';

export default function EventForm({ userId }){
  const [type, setType] = useState('like');
  const [target, setTarget] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  const submit = async (e) =>{
    e.preventDefault();
    try{
      const payload = { type, sourceUserId: userId || null, targetUserId: target || null, data: { text } };
      await API.post('/events', payload);
      setStatus('Event created');
      setTimeout(()=>setStatus(''),2000);
    }catch(err){
      setStatus('Error creating event');
    }
  }

  return (
    <div>
      <h3>Trigger Event (simulate)</h3>
      <form onSubmit={submit}>
        <div>
          <label>Type: </label>
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="like">like</option>
            <option value="comment">comment</option>
            <option value="follow">follow</option>
            <option value="post">post</option>
          </select>
        </div>
        <div>
          <label>Target User ID: </label>
          <input value={target} onChange={e=>setTarget(e.target.value)} placeholder="user id who receives" />
        </div>
        <div>
          <label>Text (for comment/post): </label>
          <input value={text} onChange={e=>setText(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Send Event</button>
        </div>
      </form>
      <div style={{ marginTop: 8 }}>{status}</div>
    </div>
  );
}
