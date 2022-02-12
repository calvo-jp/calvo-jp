import { Link } from 'react-router-dom';
import image from '../assets/images/404.png';
import styles from '../assets/styles/notfound.module.scss';
import ArrowLeftIcon from '../widgets/icons/ArrowLeft';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={image} alt="" draggable={false} />
      </div>

      <div className={styles.text}>
        <article>
          <h1>Error 404</h1>
          <p>The page you are trying to access does not exist</p>
        </article>

        <Link to="/about" className={styles.backButton}>
          <ArrowLeftIcon width={16} height={16} />
          <span>GO HOME</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
