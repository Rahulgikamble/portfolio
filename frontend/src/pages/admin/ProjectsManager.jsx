import { useEffect, useState } from 'react';
import api from '../../api/axios';

const EMPTY_FORM = {
  title: '',
  description: '',
  image: '',
  tech: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const load = () => api.get('/projects').then(({ data }) => setProjects(data));

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      image: project.image || '',
      tech: (project.tech || []).join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
    };
    if (editingId) {
      await api.put(`/projects/${editingId}`, payload);
    } else {
      await api.post('/projects', payload);
    }
    cancelEdit();
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/projects/${id}`);
    if (editingId === id) cancelEdit();
    load();
  };

  return (
    <div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <p className="admin-form-heading">{editingId ? 'Edit project' : 'Add a project'}</p>
        <label>
          Title
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="description" rows="3" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Image URL (a screenshot of the project)
          <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          <span className="field-hint">
            No image hosting built in yet — upload a screenshot to imgur.com (free, no account needed) or your GitHub repo, then paste the direct image link here.
          </span>
        </label>
        <label>
          Tech stack (comma separated)
          <input type="text" name="tech" value={form.tech} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
        </label>
        <label>
          Live demo URL
          <input type="text" name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." />
        </label>
        <label>
          GitHub URL
          <input type="text" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Feature on homepage
        </label>

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary btn-sm">{editingId ? 'Save changes' : 'Add project'}</button>
          {editingId && <button type="button" className="btn btn-ghost btn-sm" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>

      <div className="admin-list">
        {projects.map((project) => (
          <div key={project._id} className="admin-list-row admin-project-row">
            <div>
              <strong>{project.title}</strong>
              {project.featured && <span className="featured-tag">Featured</span>}
            </div>
            <div className="admin-form-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => startEdit(project)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="empty-note">No projects yet — add your first one above.</p>}
      </div>
    </div>
  );
};

export default ProjectsManager;
