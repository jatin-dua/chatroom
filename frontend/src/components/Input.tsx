import { twMerge } from "tailwind-merge";

interface InputProps {
    value: string;
    placeholder: string;
    onInputChange: (value: string) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    className?: string;
}

const Input: React.FC<InputProps> = ({ value, placeholder, onInputChange, onKeyDown, disabled, className}) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(event.target.value);
    }

    // const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         sendMessage();
    //     }
    // };

    return (
        <>
            <input className= {twMerge(`text-white font-bold rounded-lg px-4 py-2 outline-none`, className)}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={handleInputChange}
                onKeyDown={onKeyDown} 
                disabled={disabled}
            />
        </>
    )
}

export default Input;