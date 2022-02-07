import { Link } from 'react-router-dom';
import styles from '../../assets/styles/project.module.scss';
import GithubIcon from '../../widgets/icons/GithubIcon';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/projects" className={styles.backButton}>
        <ChevronRight />
        <span>All Projects</span>
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="">
              <GithubIcon />
              Source Code
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const ChevronRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width={16}
      height={16}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

export default Header;
