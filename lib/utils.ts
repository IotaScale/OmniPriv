import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Join conditional class names and de-duplicate conflicting Tailwind
 * utilities (the last one wins).
 *
 * Used by the `components/sections` library so a caller can override any
 * default by passing a class of the same utility group.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
