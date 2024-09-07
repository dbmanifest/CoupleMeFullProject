import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const isBase64Image = (str: string): boolean => {
  try {
    // Check if the string is base64 encoded
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};