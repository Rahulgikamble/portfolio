import { getSkillIconUrl } from '../data/skillIcons';

const SkillBadge = ({ skill }) => {
  const iconUrl = getSkillIconUrl(skill.name);

  return (
    <div className="skill-badge">
      <span className="skill-icon">
        {iconUrl ? (
          <img src={iconUrl} alt="" loading="lazy" />
        ) : (
          <span className="skill-fallback">{skill.name.slice(0, 2).toUpperCase()}</span>
        )}
      </span>
      <span className="skill-name">{skill.name}</span>
    </div>
  );
};

export default SkillBadge;
