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

interface TextFieldProps extends BaseProps {
  type?: TextFieldType;
  error?: boolean;
  label?: string;
  fullWidth?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  error,
  label,
  fullWidth,
  onChange,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [value, setValue] = React.useState(props.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();
    if (!!inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="inline-block relative">
      {!!label && (
        <label
          className={clsx(
            'absolute transition-all duration-100 cursor-text',
            !!value && '-top-2 left-2 bg-white px-1 text-sm',
            !value && 'top-2 left-3'
          )}
          onClick={handleClick}
        >
          {label}
        </label>
      )}

      <input
        className={clsx(
          'p-2 border border-gray-300 rounded-md hover:border-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-300 outline-none transition-all duration-300',
          fullWidth && 'block w-full'
        )}
        onChange={handleChange}
        ref={inputRef}
        {...props}
      />
    </div>
  );
};

export default TextField;
