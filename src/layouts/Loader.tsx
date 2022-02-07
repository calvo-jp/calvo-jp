import spinner from '../assets/images/spinner.svg';
import styles from '../assets/styles/loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={spinner} alt="" />
    </div>
  );
};

export default Loader;
