import clsx from 'clsx';
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
      <ul className={clsx(mobile_ && 'flex flex-col gap-1', desktop && 'flex')}>
        <li>
          <NavbarLink href="/">About</NavbarLink>
        </li>
        <li>
          <NavbarLink href="/projects">Projects</NavbarLink>
        </li>
        <li>
          <NavbarLink href="/contact">Contact</NavbarLink>
        </li>
        <li>
          <NavbarLink href="/contact">Blog</NavbarLink>
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

  return (
    <div
      className={clsx(
        'p-2',
        router.pathname === href &&
          'text-purple-400 md:border-b md:border-purple-500 md:text-purple-600'
      )}
    >
      <Link href={href} passHref>
        <a>{children}</a>
      </Link>
    </div>
  );
};

export default Navbar;
