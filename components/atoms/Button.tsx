'use client';

import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'subsuccess'
    | 'warning';
  size?: 'sm' | 'md' | 'lg';
  classNames?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  classNames = '',
  ...props
}: PropsWithChildren<Props>) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

  const variantClasses = {
    primary:
      'bg-indigo-400 text-white hover:bg-indigo-700 focus:ring-indigo-400',
    secondary:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500',
    success: 'bg-main-green text-white hover:bg-green-700 focus:ring-green-500',
    subsuccess:
      'bg-sub-green text-white hover:bg-green-700 focus:ring-green-500',
    warning:
      'bg-main-yellow text-white hover:bg-green-700 focus:ring-green-500',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${classNames}`}
    >
      {children}
    </button>
  );
}
