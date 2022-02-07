import * as React from 'react';
import { useParams } from 'react-router-dom';
import projects from '../../assets/json/projects.json';
import styles from '../../assets/styles/project.module.scss';
import IProject from '../../types/project';
import NotFound from '../NotFound';
import Header from './Header';

interface Params {
  slug: string;
  [key: string]: any;
}

const Project = () => {
  const params = useParams<Params>();

  const [project, setProject] = React.useState<IProject>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setProject(projects.find((project) => project.slug === params.slug));
    setLoading(false);
  }, []);

  // TODO: add loader
  if (loading) return <React.Fragment />;

  if (!project) return <DoesNotExist />;

  return (
    <div className={styles.project}>
      <Header />
    </div>
  );
};

const DoesNotExist = () => {
  return (
    <div className={styles.error404}>
      <Header />

      <main className={styles.main}>
        <NotFound message="Go back to projects" redirect="/projects" />
      </main>
    </div>
  );
};

export default Project;
