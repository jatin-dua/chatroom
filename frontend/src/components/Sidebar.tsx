import Box from "./Box";
import NameInput from "./NameInput";
import SidebarItem from "./SIdebarItem";

interface SidebarProps {
    // children: React.ReactNode;
    handleSubmitName: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = (
    {
        handleSubmitName
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
                        justify-center items-center
                    ">
                        <SidebarItem className="h-1/5">
                            <NameInput handleSubmitName={handleSubmitName}/>
                        </SidebarItem>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default Sidebar;
