"use client";
import logo from "@/assets/brand-logo.png";
import logotext from "@/assets/brand-text.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CartSheet } from "../cart/cartSheet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { SignIn } from "@/actions";
import { useState } from "react";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data } = useSession();
  const user = data?.user;
  const isAdmin = user?.role === "admin";

  return (
    <nav className="">
      <div className="container flex flex-wrap items-center justify-between p-4 mx-auto">
        <Link href={"/"} className="flex items-center rtl:space-x-reverse">
          <Image
            src={logo || "/placeholder.svg"}
            className="w-10"
            alt="plant logo"
          />
          <Image
            src={logotext || "/placeholder.svg"}
            className="w-20"
            alt="plant logo"
          />
        </Link>

        {/* for bigger screen */}
        <div className="flex items-center gap-2" id="navbar-default">
          <div className="items-center hidden gap-2 font-medium md:flex">
            {navlinks}
          </div>
          <CartSheet />

          {/* Login/Profile Section */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hidden w-8 h-8 ml-4 rounded-full md:flex"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={user.image || "/placeholder.svg"}
                      alt={user.name as string}
                    />
                    <AvatarFallback>{user.name!.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="items-center hidden gap-2 bg-orange-100 md:flex hover:bg-orange-200"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Login to your account</DialogTitle>
                  <DialogDescription>
                    Sign in to access your account and preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center py-4">
                  <form action={SignIn} className="w-full">
                    <Button className="w-full" type="submit">
                      Continue with Google
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon className="block text-black size-6 md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-orange-100 font-popins">
              <div className="grid gap-1 w-[200px] p-4">
                {navlinks}
                {!user && (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 mt-2 bg-orange-100 hover:bg-orange-200"
                    onClick={() => setDialogOpen(true)}
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </Button>
                )}
                {user && isAdmin && (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 mt-2 font-medium text-black transition-all duration-300 ease-in-out rounded-full hover:bg-orange-200"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                {user && (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 mt-2 bg-orange-100 hover:bg-orange-200"
                    onClick={() => signOut()}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
