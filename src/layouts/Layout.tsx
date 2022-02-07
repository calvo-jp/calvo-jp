import clsx from 'clsx';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../assets/styles/layout.module.scss';
import FooterSkeleton from './FooterSkeleton';
import HeaderSkeleton from './HeaderSkeleton';
import Loader from './Loader';

const Header = React.lazy(() => import('./Header'));
const Footer = React.lazy(() => import('./Footer'));

const Layout: React.FC<React.ComponentProps<'main'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <React.Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </React.Suspense>

      <main className={clsx(styles.main, className)} {...props}>
        <React.Suspense fallback={<Loader />}>
          <Outlet />
        </React.Suspense>
      </main>

      <React.Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </React.Suspense>
    </div>
  );
};

export default Layout;
