import { cn } from "@/lib/utils";
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { Text, Pressable } from "react-native";

const Label = forwardRef<
  ElementRef<typeof Text>,
  ComponentPropsWithoutRef<typeof Text> & {
    rootProps?: Omit<ComponentPropsWithoutRef<typeof Pressable>, "onPress">;
  }
>(({ className, onPress, rootProps, ...props }, ref) => (
  <Pressable
    onPress={onPress}
    className="rounded-md disabled:opacity-50"
    {...rootProps}
  >
    <Text
      ref={ref}
      className={cn(
        "text-lg text-foreground font-medium px-0.5 py-1.5 leading-none ",
        className
      )}
      {...props}
    />
  </Pressable>
));

Label.displayName = "Label";

export { Label };
