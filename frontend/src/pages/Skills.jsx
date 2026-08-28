import { useEffect, useState } from 'react';
import api from '../api/axios';
import SkillBadge from '../components/SkillBadge';
import AdminEditLink from '../components/AdminEditLink';

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'Tools', 'Other'];

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get('/skills').then(({ data }) => setSkills(data));
  }, []);

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section className="section page-section">
      <div className="section-heading">
        <div>
          <h1>Skills &amp; Tools</h1>
          <p className="page-intro">Technologies I use to design, build, and ship full-stack applications.</p>
        </div>
        <AdminEditLink tab="skills" label="Manage skills" />
      </div>

      {grouped.length === 0 && <p className="empty-note">No skills added yet.</p>}

      {grouped.map((group) => (
        <div key={group.category} className="skill-group">
          <h2 className="skill-group-title">{group.category}</h2>
          <div className="skills-grid">
            {group.items.map((skill) => (
              <SkillBadge key={skill._id} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;
