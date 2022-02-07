import { Link } from 'react-router-dom';
import styles from '../assets/styles/notfound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <article>
        <h1>Error 404</h1>
        <p>The page you are trying to access does not exist</p>
      </article>

      <Link to="/about" className={styles.backButton}>
        Go back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
