import { Link } from 'react-router-dom';
import projects from '../assets/json/projects.json';
import styles from '../assets/styles/projects.module.scss';
import IProject from '../types/project';

const Projects = () => {
  return (
    <div className={styles.projects}>
      {projects.map((project) => (
        <Project key={project.slug} {...project} />
      ))}
    </div>
  );
};

const Project = ({ slug, name, description }: IProject) => {
  const href = '/projects/' + slug;

  return (
    <div className={styles.item}>
      <Link to={href} className={styles.image}></Link>

      <div className={styles.info}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Projects;
