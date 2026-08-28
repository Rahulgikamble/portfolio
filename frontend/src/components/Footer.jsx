import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/profile').then(({ data }) => setProfile(data)).catch(() => {});
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="status-line">
          <span className="status-dot" />
          available for opportunities
        </div>

        <div className="footer-socials">
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
          )}
          {profile?.instagram && (
            <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a>
          )}
          {profile?.whatsapp && (
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">WhatsApp</a>
          )}
        </div>

        <div className="footer-meta">
          <span>&copy; {year} {profile?.name || 'Rahul Kamble'}</span>
          <Link to="/admin/login" className="admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
