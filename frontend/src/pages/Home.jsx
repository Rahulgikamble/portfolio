import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import SkillBadge from '../components/SkillBadge';
import ProjectCard from '../components/ProjectCard';
import AdminEditLink from '../components/AdminEditLink';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/profile').then(({ data }) => setProfile(data));
    api.get('/skills').then(({ data }) => setSkills(data));
    api.get('/projects').then(({ data }) => setProjects(data));
  }, []);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);
  const topSkills = skills.slice(0, 12);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />

        <div className="hero-inner">
          <div className="hero-text">
            <span className="badge-chip">Open to opportunities</span>
            <h1>
              Hi, I'm <span className="gradient-text">{profile?.name || 'Rahul Kamble'}</span>
            </h1>
            <p className="hero-role">{profile?.role || 'Full-Stack Developer (MERN)'}</p>
            <p className="hero-tagline">{profile?.tagline || 'I design and build full-stack web applications.'}</p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">View my work</Link>
              <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
            </div>

            <div className="hero-socials">
              {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>}
              {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>}
              {profile?.instagram && <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>}
              {profile?.whatsapp && <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsappIcon /></a>}
            </div>
          </div>

          <div className="hero-photo-wrap">
            <div className="hero-photo-ring">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="hero-photo" />
              ) : (
                <div className="hero-photo-placeholder">
                  {(profile?.name || 'R').charAt(0)}
                </div>
              )}
            </div>
            <span className="floating-chip floating-chip-1">MERN Stack</span>
            <span className="floating-chip floating-chip-2">Full-Stack Dev</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="section-heading">
          <h2>About Me</h2>
          <AdminEditLink tab="profile" label="Edit bio" />
        </div>
        <p className="about-bio">{profile?.bio}</p>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{projects.length}</span>
            <span className="stat-label">Projects built</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{skills.length}</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">MERN</span>
            <span className="stat-label">Primary stack</span>
          </div>
        </div>
      </section>

      {/* SKILLS PREVIEW */}
      {topSkills.length > 0 && (
        <section className="section section-muted">
          <div className="section-heading">
            <h2>My Skills</h2>
            <div className="section-heading-actions">
              <AdminEditLink tab="skills" label="Manage skills" />
              <Link to="/skills" className="link-more">See all &rarr;</Link>
            </div>
          </div>
          <div className="skills-grid">
            {topSkills.map((skill) => (
              <SkillBadge key={skill._id} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS PREVIEW */}
      {featuredProjects.length > 0 && (
        <section className="section">
          <div className="section-heading">
            <h2>Featured Projects</h2>
            <div className="section-heading-actions">
              <AdminEditLink tab="projects" label="Manage projects" />
              <Link to="/projects" className="link-more">See all &rarr;</Link>
            </div>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* CONTACT CTA */}
      <section className="section cta-section">
        <h2>Let's build something together</h2>
        <p>Have a project in mind, or an opening on your team? I'd love to hear from you.</p>
        <Link to="/contact" className="btn btn-primary">Say hello</Link>
      </section>
    </>
  );
};

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 0Z"/></svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .62 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.06 4.95c.06 1.28.26 2.15.56 2.91a5.9 5.9 0 0 0 1.39 2.13 5.9 5.9 0 0 0 2.13 1.39c.76.3 1.63.5 2.91.56C8.33 24 8.74 24 12 24s3.67-.01 4.95-.06c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.63.56-2.91.06-1.28.06-1.69.06-4.95s0-3.67-.06-4.95c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/></svg>
);
const WhatsappIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .9.9-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>
);

export default Home;
