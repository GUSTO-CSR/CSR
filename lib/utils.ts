import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertObjectToBase64(data: any): Buffer {
  return Buffer.from(data, "base64");
}
