interface InputProps {
    value: string;
    onInputChange: (value: string) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onInputChange, onKeyDown}) => {

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
            <input 
                type="text"
                value={value}
                placeholder="Type a message..."
                onChange={handleInputChange}
                onKeyDown={onKeyDown} 
            />
        </>
    )
}

export default Input;