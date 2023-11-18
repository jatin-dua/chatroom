import NameInput from "./NameInput";
interface SidebarProps {
    // children: React.ReactNode;
    onSubmitName: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSubmitName }) => {
    return (
        <div className="flex h-full m-2">
            <div className="
            hidden 
            md:flex
            flex-col
            gap-y-4
            h-full
            w-[300px]
            p-2
            bg-neutral-900
            rounded-lg
            ">
            <NameInput onSubmitName={onSubmitName}/>
            </div>
        </div>
    );
};

export default Sidebar;
