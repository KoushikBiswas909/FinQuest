import React from 'react';
import clsx from 'clsx';
import { ButtonProps, Variant, Size } from './Button.types';

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';

const variantStyles: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-200',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const classes = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
