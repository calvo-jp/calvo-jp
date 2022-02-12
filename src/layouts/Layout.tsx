import clsx from 'clsx';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../assets/styles/layout.module.scss';
import HeaderSkeleton from './HeaderSkeleton';
import Loader from './Loader';

const Header = React.lazy(() => import('./Header'));

const Layout: React.FC<React.ComponentProps<'div'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <React.Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </React.Suspense>

      <div className={clsx(styles.outerWrapper, className)} {...props}>
        <React.Suspense fallback={<Loader />}>
          <Outlet />
        </React.Suspense>
      </div>
    </div>
  );
};

export default Layout;
