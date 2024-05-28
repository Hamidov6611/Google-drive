import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function byteConverter(bytes: number, decimals?: number, only?: string) {
  const K_UNIT = 1024;
  const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  if (!bytes) {
    return "0 Bytes";
  }

  if (only === "MB") {
    return (bytes / K_UNIT / K_UNIT).toFixed(decimals || 2) + " MB";
  }

  let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
  return (
    parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals || 2)) +
    " " +
    SIZES[i]
  );
}

export function defineImageAndFile(types: string) {
  const type = types.split("/")[1];

  if (type === "jpeg" || type === "png" || type === "jpg") return "image";
  else return "file";
}
