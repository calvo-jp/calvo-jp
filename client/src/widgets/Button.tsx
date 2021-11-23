import clsx from 'clsx';
import * as React from 'react';

type BaseProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Variant = 'primary' | 'secondary';

interface ButtonProps extends BaseProps {
  variant?: Variant;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  const primary = variant === 'primary';

  return (
    <button
      className={clsx(
        'p-2 rounded-md text-white outline-none',
        primary &&
          'border border-blue-500 bg-blue-500 focus:ring-4 focus:ring-blue-200',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
