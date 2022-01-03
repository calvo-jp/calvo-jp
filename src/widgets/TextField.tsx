import clsx from 'clsx';
import * as React from 'react';

type BaseProps = React.ComponentProps<'input'>;

type TextFieldType =
  | 'date'
  | 'datetime'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface TextFieldProps extends BaseProps {
  type?: TextFieldType;
  label?: string;
  error?: boolean;
  errorText?: string;
  fullWidth?: boolean;

  /** WARNING: Feature not implemented yet */
  multiline?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  errorText,
  fullWidth,
  multiline,
  className,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="inline-block relative">
      <Label active={!!props.value} htmlFor={props.id} onClick={handleClick}>
        {label}
      </Label>

      <Input
        // @ts-ignore
        ref={inputRef}
        error={error}
        fullWidth={fullWidth}
        {...props}
      />

      <ErrorText open={error && !!errorText}>{errorText}</ErrorText>
    </div>
  );
};

interface InputProps extends Omit<TextFieldProps, 'label' | 'error'> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, fullWidth, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'p-2 border border-gray-300 rounded-md outline-none transition-all duration-300',
          !error && 'hover:border-gray-400',
          !error && 'focus:border-blue-400 focus:ring-4 focus:ring-blue-200',
          error && 'border-red-400 focus:ring-4 focus:ring-red-200',
          fullWidth && 'block w-full',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

interface ErrorTextProps {
  open?: boolean;
}

const ErrorText: React.FC<ErrorTextProps & React.ComponentProps<'div'>> = ({
  open,
  children,
  ...props
}) => {
  if (!open) return <React.Fragment />;

  return (
    <div className="mt-1.5 ml-1.5 flex gap-1 items-center" {...props}>
      <p className="text-sm text-red-500">{children}</p>
    </div>
  );
};

interface LabelProps {
  active?: boolean;
}

const Label: React.FC<LabelProps & React.ComponentProps<'label'>> = ({
  active,
  children,
  ...props
}) => {
  return (
    <label
      className={clsx(
        'absolute transition-all duration-100 cursor-text',
        active && 'text-gray-500 -top-2 left-2 bg-white px-1 text-sm',
        !active && 'text-gray-600 top-2 left-3'
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default TextField;
