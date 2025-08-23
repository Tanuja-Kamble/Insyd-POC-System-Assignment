import React, { useEffect, useState, useRef } from 'react';
import API from '../api';

export default function NotificationList({ userId }){
  const [list, setList] = useState([]);
  const intervalRef = useRef(null);

  const fetchNotifications = async () => {
    if (!userId) return;
    try{
      const res = await API.get(`/notifications/${userId}`);
      setList(res.data.notifications || []);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchNotifications();
    intervalRef.current = setInterval(fetchNotifications, 3000);
    return ()=> clearInterval(intervalRef.current);
  }, [userId]);

  return (
    <div>
      <h3>Notifications</h3>
      <div>
        {list.length === 0 && (<div>No notifications</div>)}
        <ul>
          {list.map(n => (
            <li key={n._id} style={{ padding: 8, borderBottom: '1px solid #ddd' }}>
              <div><strong>{n.type}</strong> — {n.content}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{new Date(n.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
