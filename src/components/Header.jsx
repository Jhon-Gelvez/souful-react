import { HiSearch } from "react-icons/hi";
import { Button } from "./Button";
import logo from "../assets/souful_logo.jpeg";

export default function Header() {
    return (
        <header id="inicio" className="flex items-center justify-between bg-transparent px-4 py-3">
            <div>
                <h1 className="text-2xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">SoulfulArt</h1>
                <p className="text-xs lg:text-sm font-medium text-white/80">Arte hecho con el alma</p>
            </div>
            <div
                className="
            w-fit mr-auto ml-4 border border-white/40 rounded-full"
            >
                <img src={logo} alt="" className="w-14 lg:w-18 rounded-full p-0" />
            </div>
            <div className="flex items-center gap-3">
                <Button Icon={HiSearch} />
            </div>
        </header>
    );
}
