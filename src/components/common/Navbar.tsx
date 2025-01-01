"use client";
import logo from "@/assets/brand-logo.png";
import logotext from "@/assets/brand-text.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/useCart";
import { CartSheet } from "../cart/cartSheet";
const menu = [
  {
    name: "Products",
    to: "/products",
  },
  {
    name: "Men",
    to: "/products?gender=Men",
  },
  {
    name: "Women",
    to: "/products?gender=Woman",
  },
];

const navlinks = menu.map((item, idx) => (
  <Link
    key={idx}
    href={item.to}
    className="px-3 py-1 font-medium text-black transition-all duration-300 ease-in-out rounded-full hover:bg-orange-200 hover:scale-105"
  >
    {item.name}
  </Link>
));
const Navbar = () => {
  const { cart } = useCart();
  // console.log(user);
  return (
    <nav className="">
      <div className="container flex flex-wrap items-center justify-between p-4 mx-auto">
        <Link href={"/"} className="flex items-center rtl:space-x-reverse">
          <Image src={logo} className="w-10" alt="plant logo" />
          <Image src={logotext} className="w-20" alt="plant logo" />
        </Link>

        {/* for mobile */}

        {/* for bigger screen */}
        <div className="flex items-center gap-2" id="navbar-default">
          <div className="items-center hidden gap-2 font-medium md:flex">
            {navlinks}
          </div>
          <CartSheet />
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon className="block text-black size-6 md:hidden" />
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
