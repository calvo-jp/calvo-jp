import * as React from 'react';
import styles from '../assets/styles/footer.module.scss';
import FacebookIcon from '../widgets/icons/Facebook';
import GithubIcon from '../widgets/icons/GithubIcon';
import MessengerIcon from '../widgets/icons/Messenger';
import StackoverflowIcon from '../widgets/icons/Stackoverflow';
import TwitterIcon from '../widgets/icons/Twitter';

const Footer = () => {
  const socialIcons: [
    icon: React.FC<React.ComponentProps<'svg'>>,
    href: string
  ][] = [
    [FacebookIcon, 'https://facebook.com/calvojp'],
    [MessengerIcon, 'https://m.me/calvojp'],
    [TwitterIcon, 'https://twitter.com/calvo__jp'],
    [GithubIcon, 'https://github.com/calvo-jp'],
    [StackoverflowIcon, 'https://stackoverflow.com/users/calvojp'],
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.copywright}>&copy; JP CALVO {currentYear}</div>

      <ul className={styles.socials}>
        {socialIcons.map(([SocialIcon, href], index) => (
          <li key={index}>
            <a href={href} target="_blank">
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
