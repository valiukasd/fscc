import { Pressable, TextInput, View } from "react-native";
import { cn } from "@/lib/utils";
import {
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  useState,
} from "react";
import { EyeOff } from "@/lib/icons/eye-off";
import { Eye } from "@/lib/icons/eye";

const Input = forwardRef<
  ElementRef<typeof TextInput>,
  ComponentPropsWithoutRef<typeof TextInput> & { secure?: boolean }
>(({ className, placeholderClassName, secure = false, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const commonInputStyles = cn(
    "h-12 rounded-md border border-input bg-white px-3 text-lg leading-[1.25] text-foreground placeholder:text-muted-foreground",
    props.editable === false && "opacity-50",
    className
  );

  if (secure) {
    const Icon = showPassword ? EyeOff : Eye;

    return (
      <View
        className={cn(
          "h-12 rounded-md border border-input px-3 flex flex-row items-center",
          props.editable === false && "opacity-50",
          className
        )}
      >
        <TextInput
          ref={ref}
          secureTextEntry={!showPassword}
          className="flex-1 h-12 text-lg leading-[1.25] text-foreground placeholder:text-muted-foreground"
          placeholderClassName={cn(
            "text-muted-foreground",
            placeholderClassName
          )}
          {...props}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Icon className="size-6 text-foreground" />
        </Pressable>
      </View>
    );
  }

  return (
    <TextInput
      ref={ref}
      className={commonInputStyles}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
