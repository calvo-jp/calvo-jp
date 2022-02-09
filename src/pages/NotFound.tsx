import { Link } from 'react-router-dom';
import image from '../assets/images/404.png';
import styles from '../assets/styles/notfound.module.scss';
import ArrowLeftIcon from '../widgets/icons/ArrowLeft';

interface NotFoundProps {
  redirect?: string;
  message?: string;
}

const NotFound = (props: NotFoundProps) => {
  const { redirect = '/about', message = 'Go back to homepage' } = props;

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={image} alt="" />
      </div>

      <div className={styles.text}>
        <article>
          <h1>Error 404</h1>
          <p>The page you are trying to access does not exist</p>
        </article>

        <Link to={redirect} className={styles.backButton}>
          <ArrowLeftIcon width={16} height={16} />
          <span>{message}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
