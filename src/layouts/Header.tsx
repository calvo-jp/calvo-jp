import clsx from "clsx";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../assets/styles/header.module.scss";

const links = ["/about", "/projects", "/contact"] as const;

const Header = () => {
  const [open, setOpen] = React.useState<boolean>();

  React.useEffect(() => {
    return () => setOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/about" className={styles.logo}>
        <CodeIcon />
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

const CodeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Header;
