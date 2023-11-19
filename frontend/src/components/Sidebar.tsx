interface SidebarProps {
    // children: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    return (
        <div className="flex h-full">
            <div className="
            hidden 
            md:flex
            flex-col
            h-full
            w-[300px]
            p-2
            bg-neutral-900
            rounded-lg
            ">
                {children}
            </div>
        </div>
    );
};

export default Sidebar;
