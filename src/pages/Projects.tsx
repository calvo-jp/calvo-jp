import { Link } from 'react-router-dom';
import styles from '../assets/styles/projects.module.scss';

const Projects = () => {
  return (
    <div className={styles.projects}>
      <Project
        slug="recipes"
        name="Recipes"
        description="Find or share amazing recipes"
        repository="https://github.com/calvo-jp/recipes"
      />

      <Project
        slug="hermes"
        name="Hermes"
        description="An light-weight facebook messenger alternative"
        repository="https://github.com/calvo-jp/hermes"
      />
    </div>
  );
};

interface ProjectProps {
  slug: string;
  name: string;
  description: string;
  repository: string;
}

const Project = ({ slug, name, description }: ProjectProps) => {
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
