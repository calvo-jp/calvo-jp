import { Link } from 'react-router-dom';
import styles from '../assets/styles/contact.module.scss';
import useSocials from '../hooks/useSocials';

const Contact = () => {
  const socials = useSocials();

  return (
    <div className={styles.contact}>
      <section className={styles.content}>
        <div className={styles.form}>
          <div className={styles.caption}>
            <h2>Get in touch</h2>
          </div>

          <input type="text" placeholder="email" autoFocus />
          <input type="text" placeholder="subject" />
          <input type="text" placeholder="message" />
          <button>Send</button>
        </div>

        <div className={styles.footer}>
          <div className={styles.socials}>
            {socials.map(([SocialIcon, url]) => (
              <Link key={url} to={url} className={styles.socialIcon}>
                <SocialIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
