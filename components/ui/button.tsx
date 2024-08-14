import { cva, type VariantProps } from "class-variance-authority";
import { Pressable } from "react-native";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

// Can implement more variants if needed
const buttonVariants = cva("flex items-center justify-center rounded-md", {
  variants: {
    variant: {
      default: "bg-primary active:opacity-90",
    },
    size: {
      default: "h-10 px-6 py-2 native:h-12 native:px-5 native:py-3",
      sm: "h-9 px-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Pressable
        className={cn(
          props.disabled && "opacity-50",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        role="button"
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
