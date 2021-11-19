import clsx from 'clsx';
import useGlobalState from 'hooks/store/useGlobalState';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

interface NavbarProps {
  mobile?: boolean;
  open?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ mobile, open }) => {
  const desktop = !mobile;
  const mobile_ = !!mobile;
  const mobileShown = mobile_ && !!open;
  const mobileHidden = mobile_ && !open;

  return (
    <nav
      className={clsx(
        desktop && 'hidden md:flex',
        mobileHidden && 'hidden',
        mobileShown &&
          'flex md:hidden items-center justify-center fixed top-0 left-0 h-full w-full z-10 bg-black bg-opacity-90 text-gray-300 text-2xl'
      )}
    >
      <ul
        className={clsx(
          mobile_ && 'flex flex-col gap-1 items-center',
          desktop && 'flex gap-3'
        )}
      >
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
  const [state, dispatch] = useGlobalState();

  const handleClick = () => {
    if (state.navbarOpen) {
      dispatch({
        type: 'navbar.toggle',
      });
    }
  };

  return (
    <div
      className={clsx(
        'py-2',
        router.pathname !== href && 'md:hover:text-yellow-600',
        router.pathname === href && 'md:text-blue-600 text-blue-400'
      )}
    >
      <Link href={href} passHref>
        <a onClick={handleClick}>{children}</a>
      </Link>
    </div>
  );
};

export default Navbar;
