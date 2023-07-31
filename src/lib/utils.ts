import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
// merge tailwind classes together and help with conditional styling
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
