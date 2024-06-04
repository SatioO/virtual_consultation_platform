import MountainIcon from "@/public/icons/MountainIcon";
import Link from "next/link";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-md px-4 md:px-6 h-14 flex items-center justify-between dark:bg-gray-950/90">
            <Link className="flex items-center" href="#">
                <MountainIcon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
        </header>
    );
};

Header.displayName = "Header";

export default Header;
