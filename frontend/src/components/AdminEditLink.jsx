import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// A small pencil-icon link that only renders when you're logged in as
// admin — click it from any public page to jump straight to the matching
// tab in the dashboard, instead of hunting for it yourself.
const AdminEditLink = ({ tab, label = 'Edit' }) => {
  const { admin } = useContext(AuthContext);
  if (!admin) return null;

  return (
    <Link to={`/admin/dashboard?tab=${tab}`} className="admin-edit-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      {label}
    </Link>
  );
};

export default AdminEditLink;
