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
        <ArrowLeftIcon />
        <span>{message}</span>
      </Link>
    </div>
  );
};

const ArrowLeftIcon = () => {
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
        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default NotFound;
