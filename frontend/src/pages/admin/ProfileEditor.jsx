import { useEffect, useState } from 'react';
import api from '../../api/axios';

const FIELDS = [
  ['name', 'Name'],
  ['role', 'Role / title'],
  ['tagline', 'Tagline'],
  ['bio', 'Bio', 'textarea'],
  ['location', 'Location'],
  ['email', 'Contact email'],
  ['avatarUrl', 'Avatar image URL'],
  ['resumeUrl', 'Resume URL'],
  ['github', 'GitHub URL'],
  ['linkedin', 'LinkedIn URL'],
  ['instagram', 'Instagram URL'],
  ['whatsapp', 'WhatsApp number (digits only, with country code)'],
];

const ProfileEditor = () => {
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    api.get('/profile').then(({ data }) => setForm(data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const { data } = await api.put('/profile', form);
      setForm(data);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {FIELDS.map(([key, label, type]) => (
        <label key={key}>
          {label}
          {type === 'textarea' ? (
            <textarea name={key} rows="4" value={form[key] || ''} onChange={handleChange} />
          ) : (
            <input type="text" name={key} value={form[key] || ''} onChange={handleChange} />
          )}
        </label>
      ))}
      <button type="submit" className="btn btn-primary" disabled={status === 'saving'}>
        {status === 'saving' ? 'Saving...' : 'Save changes'}
      </button>
      {status === 'saved' && <p className="form-note success">Saved.</p>}
      {status === 'error' && <p className="form-note error-text">Could not save. Try again.</p>}
    </form>
  );
};

export default ProfileEditor;
