import spinner from '../assets/images/spinner.svg';
import styles from '../assets/styles/loader.module.scss';

interface LoaderProps {
  width?: number;
  height?: number;
}

const Loader = (props: LoaderProps) => {
  return (
    <div className={styles.loader}>
      <img src={spinner} alt="" {...props} />
    </div>
  );
};

export default Loader;
