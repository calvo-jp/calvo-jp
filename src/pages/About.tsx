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
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
    </div>
  );
};

const ArrowRightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      width={16}
      height={16}
    >
      <path
        fillRule="evenodd"
        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default About;
