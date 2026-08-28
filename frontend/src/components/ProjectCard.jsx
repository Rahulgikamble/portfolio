const ProjectCard = ({ project }) => (
  <article className="project-card">
    <div className="project-media">
      {project.image ? (
        <img src={project.image} alt={project.title} loading="lazy" />
      ) : (
        <div className="project-media-placeholder">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="m3 15 4.5-4.5a2 2 0 0 1 2.8 0L15 15" />
            <path d="m14 14 1.5-1.5a2 2 0 0 1 2.8 0L21 15" />
            <circle cx="8" cy="8.5" r="1.5" />
          </svg>
          <span>No screenshot added yet</span>
        </div>
      )}
    </div>

    <div className="project-body">
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      {project.tech?.length > 0 && (
        <div className="tech-tags">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      )}

      <div className="project-links">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            Live demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
            Source
          </a>
        )}
      </div>
    </div>
  </article>
);

export default ProjectCard;
