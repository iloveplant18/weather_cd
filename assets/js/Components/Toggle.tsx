import { InputHTMLAttributes } from "react";

type ToggleProps = InputHTMLAttributes<any>;

function Toggle({ className, type, ...props }: ToggleProps) {
  return (
    <label
      className={className +
        " flex items-center w-20 h-8 rounded-full glass-block before:absolute before:left-1 before:h-6 before:aspect-square before:glass-block has-[:checked]:before:left-13 before:transition-all"}
    >
      <input
        className="hidden"
        type={type ?? "checkbox"}
        {...props}
      />
    </label>
  );
}

export default Toggle;
