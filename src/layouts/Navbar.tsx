import clsx from 'clsx';
import useStoreState from 'hooks/store/useState';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

interface NavbarProps {
  mobile?: boolean;
  open?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ mobile, open }) => {
  return (
    <nav
      className={clsx(
        !mobile && 'hidden md:flex',
        mobile && !open && 'hidden',
        mobile &&
          open &&
          'flex md:hidden items-center justify-center fixed top-0 left-0 h-full w-full z-10 bg-black bg-opacity-90 text-gray-300 text-2xl'
      )}
    >
      <ul className={clsx('flex gap-3', mobile && 'flex-col items-center')}>
        <li>
          <NavbarLink href="/">About</NavbarLink>
        </li>
        <li>
          <NavbarLink href="/projects">Projects</NavbarLink>
        </li>
        <li>
          <NavbarLink href="/contact">Contact</NavbarLink>
        </li>
      </ul>
    </nav>
  );
};

interface NavbarLinkProps {
  href: string;
  mobile?: boolean;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const [state, dispatch] = useStoreState();

  const ensureMobileNavbarCloses = () => {
    if (state.navbarOpen) {
      dispatch({
        type: 'navbar.toggle',
      });
    }
  };

  return (
    <Link href={href} passHref>
      <a
        onClick={ensureMobileNavbarCloses}
        className={clsx(
          router.pathname !== href && 'md:hover:text-amber-700',
          router.pathname === href && 'md:text-blue-500 text-blue-400'
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default Navbar;
