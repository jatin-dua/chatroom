import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

interface NameInputProps {
    onSubmitName: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmitName }) => {
    const [inputData, setInputData] = useState<string>('');
    const handleClick = () => {
        onSubmitName(inputData);
        setInputData('');
    }

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2 h-1/4">
            <Input value={inputData} placeholder="Username" onInputChange={setInputData} onKeyDown={handleInputKeyDown} className="text-center"/>
            <Button onClick={handleClick} text="Submit"/>
        </div>
    )
}

export default NameInput;