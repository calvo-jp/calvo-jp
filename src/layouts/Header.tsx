import clsx from 'clsx';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../assets/styles/header.module.scss';

// prettier-ignore
const links = [
  '/about', 
  '/projects', 
  '/contact'
]

const Header = () => {
  const [open, setOpen] = React.useState<boolean>();

  React.useEffect(() => {
    return () => setOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/about" className={styles.logo}>
        <span>JOHN</span>
        <span>STUDIOS</span>
      </Link>

      <nav
        className={clsx({
          [styles.nav]: true,
          [styles.active]: open,
        })}
      >
        <ul>
          {links.map((link) => (
            <li key={link}>
              <NavLink
                to={link}
                onClick={() => setOpen(false)}
                className={(props) => clsx({ [styles.active]: props.isActive })}
              >
                {link
                  .substring(1)
                  .charAt(0)
                  .toUpperCase()
                  .concat(link.substring(2))}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={() => setOpen((currentState) => !currentState)}
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

export default Header;
