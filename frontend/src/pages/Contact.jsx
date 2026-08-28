import { useEffect, useState } from 'react';
import api from '../api/axios';
import Toast from '../components/Toast';

const Contact = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null); // { message, type } | null

  useEffect(() => {
    api.get('/profile').then(({ data }) => setProfile(data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/messages', form);
      setToast({ message: "Message sent! I'll get back to you soon.", type: 'success' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section page-section">
      <h1>Get in Touch</h1>
      <p className="page-intro">Have a project, a role, or just want to say hi? Send a message below.</p>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
          </label>

          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? 'Sending...' : 'Send message'}
          </button>
        </form>

        <div className="contact-side">
          <h3>Reach me directly</h3>
          <ul className="contact-links">
            {profile?.email && <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>}
            {profile?.github && <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>}
            {profile?.linkedin && <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>}
            {profile?.instagram && <li><a href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a></li>}
            {profile?.whatsapp && (
              <li><a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a></li>
            )}
          </ul>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
};

export default Contact;
