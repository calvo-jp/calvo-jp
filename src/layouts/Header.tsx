import clsx from 'clsx';
import useGlobalState from 'hooks/store/useGlobalState';
import Link from 'next/link';
import * as React from 'react';
import Navbar from './Navbar';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [state] = useGlobalState();

  return (
    <React.Fragment>
      <header className="flex justify-between items-center py-4 px-6">
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
      <a className="flex items-center">
        <div className="text-3xl text-blue-400">
          JUAN
          <span className="text-blue-600 font-bold">ON</span>W
          <span className="text-blue-600 font-bold">E</span>B
        </div>
        <span className="border-l h-4 border-gray-200 mx-3" />
        <div className="text-sm text-yellow-600 uppercase">JP CALVO</div>
      </a>
    </Link>
  );
};

const Hamburger = () => {
  const [state, dispatch] = useGlobalState();

  const toggleNavbar = () => {
    dispatch({
      type: 'navbar.toggle',
    });
  };

  return (
    <button
      className={clsx('z-20 md:hidden', state.navbarOpen && 'text-gray-400')}
      onClick={toggleNavbar}
    >
      Toggle Menu
    </button>
  );
};

export default Header;
