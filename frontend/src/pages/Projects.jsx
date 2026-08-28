import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';
import AdminEditLink from '../components/AdminEditLink';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(({ data }) => setProjects(data));
  }, []);

  return (
    <section className="section page-section">
      <div className="section-heading">
        <div>
          <h1>Projects</h1>
          <p className="page-intro">A few things I've built end to end, from database to UI.</p>
        </div>
        <AdminEditLink tab="projects" label="Add / edit projects" />
      </div>

      {projects.length === 0 ? (
        <p className="empty-note">No projects added yet.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
