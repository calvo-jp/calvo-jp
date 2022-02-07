import { Link } from 'react-router-dom';
import styles from '../assets/styles/notfound.module.scss';

interface NotFoundProps {
  redirect?: string;
  message?: string;
}

const NotFound = (props: NotFoundProps) => {
  const { redirect = '/about', message = 'Go back to homepage' } = props;

  return (
    <div className={styles.container}>
      <article>
        <h1>Error 404</h1>
        <p>The page you are trying to access does not exist</p>
      </article>

      <Link to={redirect} className={styles.backButton}>
        {message}
      </Link>
    </div>
  );
};

export default NotFound;
