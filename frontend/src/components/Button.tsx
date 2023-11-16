import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends
    ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    type = "button",
    text,
    onClick
}, ref) => (
    <button type={type} className={twMerge(`
        w-full
        rounded-full
        bg-amber-500
        border
        border-transparent
        px-3
        py-3
        disabled:cursor-not-allowed
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition
    `, className)}
        onClick={onClick}
        ref={ref}
    >
        {text}
    </button>
));
Button.displayName = "Button";

export default Button;