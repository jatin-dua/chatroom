import { twMerge } from "tailwind-merge";

interface PanelProps {
    children?: React.ReactNode;
    className?: string;
}

const Panel: React.FC<PanelProps> = ({ children, className }) => {
    return (
        <div className={twMerge(`
            bg-neutral-900
            py-2
            flex
        `, className)}>
            { children }
        </div>
    )
}

export default Panel;