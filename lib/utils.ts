import { CustomResponse } from "@/app/custom-response";
import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertObjectToBase64(data: any): Buffer {
  return Buffer.from(data, "base64");
}

export function ShowResult<T>(result: CustomResponse<T>): boolean {
  if (result.error) {
    toast.error(result.message);
  }
  return result.status;
}
