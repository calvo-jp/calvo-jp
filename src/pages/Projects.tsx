import * as React from 'react';
import projects from '../assets/json/projects.json';
import styles from '../assets/styles/projects.module.scss';
import IProject from '../types/project';
import ArrowRightIcon from '../widgets/icons/ArrowRight';

const Projects = () => {
  return (
    <div className={styles.projects}>
      <Project {...projects[0]} />
    </div>
  );
};

const Project = ({ name, description, screenshots, repository }: IProject) => {
  const [image, setImage] = React.useState<string>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import(/* @vite-ignore */ '../assets/images/screenshots/' + screenshots[0])
      .then((module) => setImage(module.default))
      .catch(console.error)
      .finally(() => setLoading(false));
  });

  return (
    <div className={styles.item}>
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.image}>{image && <img src={image} alt="" />}</div>

      <div className={styles.actions}>
        <a href={repository}>
          <span>Source Code</span>
          <ArrowRightIcon width={16} height={16} />
        </a>
      </div>
    </div>
  );
};

export default Projects;
