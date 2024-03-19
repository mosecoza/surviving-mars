import React from "react";

type Variant = "primary" | "warning" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800",
  warning:
    "text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900",
  danger:
    "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
};

interface Props {
  variant: Variant;
  title: string;
  handleClick: (param: any) => void;
}

export const CardButton = ({ variant = "primary", title, handleClick }: Props) => {
  return (
    <button data-testid={`btn-${variant}`} onClick={handleClick} className={variants[variant]}>
      {title}
    </button>
  );
};
