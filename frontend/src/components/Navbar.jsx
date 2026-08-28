import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const initials = admin?.name
    ? admin.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'A';

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          Rahul<span className="brand-dot">.</span>
        </NavLink>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-right">
          {admin ? (
            <div className="admin-indicator">
              <button
                className="admin-avatar-btn"
                onClick={() => setMenuOpen((m) => !m)}
                aria-label="Admin menu"
                title={`Logged in as ${admin.name}`}
              >
                <span className="admin-avatar">{initials}</span>
                <span className="admin-online-dot" />
              </button>
              {menuOpen && (
                <div className="admin-dropdown">
                  <p className="admin-dropdown-label">Logged in as {admin.name}</p>
                  <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/admin/login" className="login-icon-btn" title="Admin login" aria-label="Admin login">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </NavLink>
          )}

          <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
