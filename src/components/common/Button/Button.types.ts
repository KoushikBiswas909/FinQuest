import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type Variant = 'primary' | 'secondary' | 'danger' | 'outline';
export type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}
