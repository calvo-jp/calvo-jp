import { Link } from 'react-router-dom';
import styles from '../assets/styles/about.module.scss';

const About = () => {
  return (
    <div className={styles.container}>
      <section className={styles.about}>
        <h2 className={styles.heading}>
          I'm <span className={styles.gradientText}>JP Calvo</span>.
        </h2>

        <p className={styles.bio}>
          An aspiring web developer who loves to use modern tech stacks.
        </p>

        <div className={styles.buttonContainer}>
          <Link to="/projects" className={styles.gradientButton}>
            Go to Projects
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
