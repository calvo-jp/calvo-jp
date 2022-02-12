import clsx from 'clsx';
import * as React from 'react';
import styles from '../assets/styles/layout.module.scss';

const Container: React.FC<React.ComponentProps<'div'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx(styles.innerWrapper, className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
