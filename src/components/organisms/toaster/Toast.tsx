import { cva, type VariantProps } from "class-variance-authority";
import { ReactElement, useEffect, useState } from "react";

import { cn } from "@/utils/cn/cn";

export const toastVariants = cva(
  "pointer-events-auto data-[state=open]:animate-toast-open data-[state=close]:animate-toast-close mx-10 mb-4 flex items-center gap-2 px-6 py-3 text-sm font-semibold first:mb-10",
  {
    variants: {
      variant: {
        default: "bg-blue-200 text-blue-500",
        error: "bg-red-200 text-red-500",
      },
      size: {
        default: "ml-auto w-[250px] rounded",
        full: "box-border rounded-[28px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  content: string | ReactElement;
  className?: string;
  delay?: number;
  autoClose?: boolean;
}

const getIconSrc = (variant: VariantProps<typeof toastVariants>["variant"]) => {
  switch (variant) {
    case "default":
      return "/icons/check.png";
    case "error":
      return "/icons/error.png";
    default:
      return "/icons/check.png";
  }
};

const TOAST_UNMOUNT_DELAY = 190;

export default function Toast({
  content,
  delay,
  autoClose,
  className,
  ...props
}: ToastProps) {
  const [isOpen, setIsOpen] = useState(true);

  // toast가 unmount되기(close) 전 toast-close 애니메이션 실행
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (autoClose && delay) {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, delay - TOAST_UNMOUNT_DELAY);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        toastVariants({
          ...props,
          className,
        }),
      )}
      data-state={isOpen ? "open" : "close"}
    >
      <img
        src={getIconSrc(props.variant)}
        alt="토스트 아이콘"
        width={24}
        height={24}
      />
      {typeof content === "string" ? <p>{content}</p> : content}
    </div>
  );
}
