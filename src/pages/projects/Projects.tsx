import styles from '../../assets/styles/projects.module.scss';
import useProjects from '../../hooks/useProjects';
import Project from './Project';

const Projects = () => {
  const projects = useProjects();

  return (
    <div className={styles.projects}>
      <Project {...projects[0]} />
    </div>
  );
};

export default Projects;
