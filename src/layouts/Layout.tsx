import clsx from 'clsx';
import * as React from 'react';
import styles from '../assets/styles/layout.module.scss';
import FooterSkeleton from './FooterSkeleton';
import HeaderSkeleton from './HeaderSkeleton';

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
        {children}
      </main>

      <React.Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </React.Suspense>
    </div>
  );
};

export default Layout;
