import styles from "../assets/styles/footer-skeleton.module.scss";

const FooterSkeleton = () => {
  return (
    <footer className={styles.footerSkeleton}>
      <div className={styles.copywright}></div>

      <ul className={styles.icons}>
        {new Array(4).fill(null).map((_, index) => (
          <li key={index}>
            <div className={styles.icon}></div>
          </li>
        ))}
      </ul>
    </footer>
  );
};

const currentYear = new Date().getFullYear();

export default FooterSkeleton;
