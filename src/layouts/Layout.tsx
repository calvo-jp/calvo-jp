import clsx from 'clsx';
import * as React from 'react';
import styles from '../assets/styles/layout.module.scss';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = React.ComponentProps<'main'>;

const Layout: React.FC<LayoutProps> = ({ children, className, ...props }) => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={clsx(styles.main, className)} {...props}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
