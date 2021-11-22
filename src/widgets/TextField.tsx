import clsx from 'clsx';
import * as React from 'react';

type BaseProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

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

type BooleanOrString = boolean | string;

interface TextFieldProps extends BaseProps {
  type?: TextFieldType;
  label?: string;
  error?: BooleanOrString;
  fullWidth?: boolean;

  /** WARNING: Feature not implemented yet */
  multiline?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  fullWidth,
  multiline,
  className,
  onChange,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <div className="inline-block relative">
      <Label active={!!value} onClick={handleClick}>
        {label}
      </Label>

      <Input
        // @ts-ignore
        ref={inputRef}
        error={!!error}
        fullWidth={fullWidth}
        onChange={handleChange}
        {...props}
      />

      <ErrorAlert open={typeof error === 'string'}>{error}</ErrorAlert>
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
          !error &&
            'hover:border-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-200',
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

interface ErrorAlertProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  open?: boolean;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
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

interface LabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  active?: boolean;
}

const Label: React.FC<LabelProps> = ({ active, children, ...props }) => {
  return (
    <label
      className={clsx(
        'text-gray-600 absolute transition-all duration-100 cursor-text',
        active && '-top-2 left-2 bg-white px-1 text-sm',
        !active && 'top-2 left-3'
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default TextField;
