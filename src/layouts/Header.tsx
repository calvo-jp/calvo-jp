import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../assets/styles/header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>JOHN</span>
        <span>STUDIOS</span>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

interface LinkProps {
  href: string;
}

const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <NavLink
      className={(props) => (props.isActive ? styles.active : '')}
      to={href}
    >
      {children}
    </NavLink>
  );
};

export default Header;
