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
        w-1/2
        rounded-full
        bg-amber-500
        border
        border-transparent
        px-1
        py-2
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