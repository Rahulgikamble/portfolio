import { useEffect, useState } from 'react';
import api from '../../api/axios';

const MessagesInbox = () => {
  const [messages, setMessages] = useState([]);

  const load = () => api.get('/messages').then(({ data }) => setMessages(data));

  useEffect(() => {
    load();
  }, []);

  const handleRead = async (id) => {
    await api.put(`/messages/${id}/read`);
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/messages/${id}`);
    load();
  };

  return (
    <div className="admin-list">
      {messages.map((msg) => (
        <div key={msg._id} className={`message-card ${msg.read ? '' : 'unread'}`}>
          <div className="message-head">
            <strong>{msg.name}</strong>
            <span>{new Date(msg.createdAt).toLocaleString()}</span>
          </div>
          <a href={`mailto:${msg.email}`} className="message-email">{msg.email}</a>
          <p>{msg.message}</p>
          <div className="admin-form-actions">
            {!msg.read && <button className="btn btn-ghost btn-sm" onClick={() => handleRead(msg._id)}>Mark read</button>}
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(msg._id)}>Delete</button>
          </div>
        </div>
      ))}
      {messages.length === 0 && <p className="empty-note">No messages yet.</p>}
    </div>
  );
};

export default MessagesInbox;
