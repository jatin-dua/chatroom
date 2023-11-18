import Box from "./Box";

interface SidebarProps {
    // children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = (
    {
        // children
    }
) => {
    return (
        <div className="flex h-full">
            <div className="
            hidden 
            md:flex
            flex-col
            gap-y-2
            bg-black
            h-full
            w-[300px]
            p-2"
            >
            <Box className="h-full">
                <div
                    className="
                        flex
                        flex-col
                        gap-y-4
                        px-5
                        py-4
                    "></div>
                </Box>
            </div>
        </div>
    );
};

export default Sidebar;
