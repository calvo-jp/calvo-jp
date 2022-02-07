import { Link } from 'react-router-dom';
import styles from '../assets/styles/about.module.scss';
import Layout from '../layouts/Layout';

const About = () => {
  return (
    <Layout className={styles.container}>
      <section className={styles.about}>
        <h2 className={styles.heading}>
          I'm <span className={styles.gradientText}>JP Calvo</span>.
        </h2>

        <p className={styles.description}>
          An aspiring web developer who loves using new tech stacks to develop
          fast websites with modern design, maintainable and easy to use.
        </p>

        <div className={styles.buttonContainer}>
          <Link to="/projects" className={styles.gradientButton}>
            Go to Projects
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
