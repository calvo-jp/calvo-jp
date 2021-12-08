import clsx from 'clsx';
import useGlobalState from 'hooks/store/useGlobalState';
import Link from 'next/link';
import * as React from 'react';
import CloseIcon from 'widgets/icons/Close';
import ExclamationCircleIcon from 'widgets/icons/ExclamationCircle';
import MenuIcon from 'widgets/icons/Menu';
import Navbar from './Navbar';

type HeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const Header: React.FC<HeaderProps> = ({ children, className, ...props }) => {
  const [state] = useGlobalState();

  return (
    <React.Fragment>
      <header
        className={clsx(
          'flex justify-between items-center py-4 px-6 bg-white',
          className
        )}
        {...props}
      >
        <Logo />
        <Navbar />
        <Hamburger />
      </header>

      <Navbar mobile open={state.navbarOpen} />
    </React.Fragment>
  );
};

const Logo = () => {
  return (
    <Link href="/" passHref>
      <a className="flex items-center text-red-400">
        <ExclamationCircleIcon className="w-5 h-5 mr-1" />
        <span>LOGO COMING SOON</span>
      </a>
    </Link>
  );
};

const Hamburger = () => {
  const [state, dispatch] = useGlobalState();

  const toggleNavbar = () => dispatch({ type: 'navbar.toggle' });

  return (
    <button
      className={clsx('z-20 md:hidden', state.navbarOpen && 'text-gray-400')}
      onClick={toggleNavbar}
    >
      {state.navbarOpen && <CloseIcon className="text-gray-400" />}
      {!state.navbarOpen && <MenuIcon className="text-gray-600" />}
    </button>
  );
};

export default Header;
