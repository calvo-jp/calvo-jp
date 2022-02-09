import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/contact.module.scss';
import useSocials from '../hooks/useSocials';

const Contact = () => {
  return (
    <div className={styles.contact}>
      <section className={styles.wrapper}>
        <div></div>
      </section>
    </div>
  );
};

const Socials = () => {
  const socials = useSocials();

  return (
    <div className={styles.socials}>
      {socials.map(([SocialIcon, url]) => (
        <Link key={url} to={url} className={styles.socialIcon}>
          <SocialIcon />
        </Link>
      ))}
    </div>
  );
};

export default Contact;
