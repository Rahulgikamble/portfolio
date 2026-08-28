import { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ProfileEditor from './ProfileEditor';
import SkillsManager from './SkillsManager';
import ProjectsManager from './ProjectsManager';
import MessagesInbox from './MessagesInbox';

const TABS = [
  { key: 'profile', label: 'Profile' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'messages', label: 'Messages' },
];

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const initialTab = TABS.some((t) => t.key === requestedTab) ? requestedTab : 'profile';

  const [tab, setTab] = useState(initialTab);
  const { admin, logout } = useContext(AuthContext);

  return (
    <section className="section page-section">
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-intro">Signed in as {admin?.name}</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={logout}>Log out</button>
      </div>

      <div className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`admin-tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="admin-panel">
        {tab === 'profile' && <ProfileEditor />}
        {tab === 'skills' && <SkillsManager />}
        {tab === 'projects' && <ProjectsManager />}
        {tab === 'messages' && <MessagesInbox />}
      </div>
    </section>
  );
};

export default AdminDashboard;
