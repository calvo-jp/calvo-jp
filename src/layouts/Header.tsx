import clsx from 'clsx';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../assets/styles/header.module.scss';

const Header = () => {
  const [open, setOpen] = React.useState<boolean>();

  const toggle = () => setOpen((value) => !value);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>JOHN</span>
        <span>STUDIOS</span>
      </div>

      <nav
        className={clsx({
          [styles.nav]: true,
          [styles.active]: open,
        })}
      >
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

      <button
        onClick={toggle}
        className={clsx({
          [styles.hamburger]: true,
          [styles.active]: open,
        })}
      >
        <div></div>
        <div></div>
      </button>
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
