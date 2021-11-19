import clsx from 'clsx';
import * as React from 'react';
import CloseIcon from './icons/Close';

type BaseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

interface AlertProps extends BaseProps {
  open?: boolean;
  variant?: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  open,
  variant,
  onClose,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'border-l-4 border-red-300 bg-red-100 p-3 text-sm text-red-800 flex items-center',
        !open && 'hidden',
        className
      )}
      {...props}
    >
      <div className="flex-grow">{children}</div>

      {!!onClose && <CloseButton tabIndex={-1} onClick={onClose} />}
    </div>
  );
};

const CloseButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return (
    <button {...props}>
      <CloseIcon className="w-5 h-5 text-red-800 opacity-30 hover:opacity-60 transition-opacity duration-200" />
    </button>
  );
};

export default Alert;
