import logo from "@/assets/brand-logo.png";
import logotext from "@/assets/brand-text.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const menu = [
  {
    name: "Products",
    to: "/products",
  },
  {
    name: "Men",
    to: "/shoes",
  },
  {
    name: "Women",
    to: "/shoes",
  },
];

const Navbar = () => {
  // console.log(user);
  const navlinks = menu.map((item, idx) => (
    <Link
      key={idx}
      href={item.to}
      className="text-black hover:bg-orange-200 py-1 px-3 rounded-full transition-all duration-300 ease-in-out hover:scale-105 font-medium"
    >
      {item.name}
    </Link>
  ));
  return (
    <nav className="">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={"/"} className="flex items-center rtl:space-x-reverse">
          <Image src={logo} className="w-10" alt="plant logo" />
          <Image src={logotext} className="w-20" alt="plant logo" />
        </Link>

        {/* for mobile */}

        {/* for bigger screen */}
        <div className="flex items-center gap-6" id="navbar-default">
          <div className="md:flex items-center hidden gap-2 font-medium">
            {navlinks}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon className="size-6 md:hidden block text-black" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-orange-100 font-popins">
              <div className="grid gap-1 w-[200px] p-4">{navlinks}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
