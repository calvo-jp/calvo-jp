import { Link } from 'react-router-dom';
import styles from '../assets/styles/contact.module.scss';
import useSocials from '../hooks/useSocials';

const Contact = () => {
  const socials = useSocials();

  return (
    <div className={styles.contact}>
      <section className={styles.content}>
        <div className={styles.form}></div>

        <div className={styles.socials}>
          {socials.map(([SocialIcon, url]) => (
            <Link key={url} to={url} className={styles.socialIcon}>
              <SocialIcon />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
