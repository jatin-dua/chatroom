import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    children: React.ReactNode;
    className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ children, className }) => {
    return (
        <div className={twMerge(`overflow-y-auto overflow-hidden flex flex-col items-center justify-center my-3`, className)}>
            {children}
        </div>
    )
}

export default SidebarItem;