import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../../assets/styles/header.module.scss";
import CodeIcon from "../widgets/icons/Code";

const links = ["/about", "/projects", "/contact"] as const;

const Header = () => {
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
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

export default Header;
