import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dompurify from 'dompurify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const stringToColor = (str: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < str.length; ++i) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; ++i) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
};

export const clean = (dirty: string) => dompurify.sanitize(dirty);
