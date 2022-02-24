import styles from '../assets/styles/footer.module.scss';
import useSocials from '../hooks/useSocials';

const Footer = () => {
  const socialIcons = useSocials();

  return (
    <footer className={styles.footer}>
      <div className={styles.copywright}>&copy; JP CALVO {currentYear}</div>

      <ul className={styles.socials}>
        {socialIcons.map(([SocialIcon, href], index) => (
          <li key={index}>
            <a href={href} target="_blank" rel="norefferer noopener">
              <SocialIcon className={styles.socialIcon} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

const currentYear = new Date().getFullYear();

export default Footer;
