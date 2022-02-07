import styles from '../assets/styles/header-skeleton.module.scss';

const HeaderSkeleton = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}></div>
      <div className={styles.nav}></div>
      <div className={styles.hamburger}></div>
    </header>
  );
};

export default HeaderSkeleton;
