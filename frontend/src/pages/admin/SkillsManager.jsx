import { useEffect, useState } from 'react';
import api from '../../api/axios';
import SkillBadge from '../../components/SkillBadge';
import { KNOWN_SKILL_NAMES } from '../../data/skillIcons';

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools', 'Other'];

// A friendlier display list built from the icon map's keys — de-duplicated
// and title-cased so the autocomplete dropdown reads naturally.
const SUGGESTED_SKILLS = [...new Set(KNOWN_SKILL_NAMES)]
  .map((s) => s.replace(/(^|\s)\S/g, (t) => t.toUpperCase()))
  .sort();

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'Frontend' });

  const load = () => api.get('/skills').then(({ data }) => setSkills(data));

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    await api.post('/skills', form);
    setForm({ name: '', category: form.category });
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/skills/${id}`);
    load();
  };

  return (
    <div>
      <form className="admin-inline-form" onSubmit={handleAdd}>
        <input
          type="text"
          list="skill-suggestions"
          placeholder="Skill name, e.g. React — start typing to see options"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <datalist id="skill-suggestions">
          {SUGGESTED_SKILLS.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary btn-sm">Add skill</button>
      </form>
      <p className="field-hint" style={{ marginTop: '-14px', marginBottom: '24px' }}>
        150+ known technologies get a real logo automatically — start typing to see suggestions. Any other name still saves fine, just shows a plain initial badge instead of a logo.
      </p>

      <div className="admin-list">
        {skills.map((skill) => (
          <div key={skill._id} className="admin-list-row">
            <SkillBadge skill={skill} />
            <span className="admin-list-meta">{skill.category}</span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(skill._id)}>Delete</button>
          </div>
        ))}
        {skills.length === 0 && <p className="empty-note">No skills yet — add your first one above.</p>}
      </div>
    </div>
  );
};

export default SkillsManager;
