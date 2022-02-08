import * as React from 'react';
import styles from '../../assets/styles/projects.module.scss';
import useProjects from '../../hooks/useProjects';
import IProject from '../../types/project';
import ArrowRightIcon from '../../widgets/icons/ArrowRight';
import Control from './Control';

const Projects = () => {
  const projects = useProjects();

  return (
    <div className={styles.projects}>
      <Project {...projects[0]} />
    </div>
  );
};

const imagesDir = '../../assets/images/screenshots/';

const Project = ({ name, description, screenshots, repository }: IProject) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<boolean>();

  return (
    <div className={styles.item}>
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.box}>
        <Control type="prev" />

        <div className={styles.image}>
          <img src={screenshots} alt="" />
        </div>

        <Control type="next" />
      </div>

      <div className={styles.actions}>
        <div className={styles.mobileControlsWrapper}>
          <Control type="prev" mobile />
          <Control type="next" mobile />
        </div>

        <a href={repository}>
          <span>Source Code</span>
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
};

export default Projects;
