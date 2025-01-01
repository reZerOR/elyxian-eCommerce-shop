import logo from "@/assets/brand-logo.png";
import logotext from "@/assets/brand-text.png";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.facebook.com/MRK012?mibextid=ZbWKwL",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-facebook"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
  ];
  const menu = [
    {
      name: "Shoes",
      to: "/products",
    },
    {
      name: "Men",
      to: "/products?gender=Men",
    },
    {
      name: "Women",
      to: "/products?gender=Women",
    },
  ];

  const contacts = [
    {
      text: "01879-797697",
      icon: <Phone size={16}/>,
    },
    {
      text: "elyxian.eu@gmail.com",
      icon: <Mail size={16}/>,
    },
    {
      text: "Chittagong, Bangladesh",
      icon: <MapPin size={16}/>,
    },
  ];
  return (
    <footer className="bg-orange-100 z-[-1] text-orange-800 py-8 overflow-hidden">
      <div className="container relative px-4 mx-auto">
        <div className="absolute z-0 w-2/3 h-full transform rotate-45 bg-orange-200 rounded-full opacity-50 -bottom-1/2 -right-1/4"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between">
          <div className="w-full mb-6 md:w-auto md:mb-0">
            <div className="inline-block p-3 transform bg-white rounded-lg shadow-lg -rotate-3">
              <div className="flex gap-1">
                <Image
                  src={logo}
                  alt="Company Logo"
                  width={120}
                  height={60}
                  className="w-auto h-12"
                />
                <Image
                  src={logotext}
                  alt="Company Logo"
                  width={120}
                  height={60}
                  className="w-auto h-12"
                />
              </div>
            </div>
          </div>
          <div className="w-full mb-6 md:w-auto md:mb-0">
            <nav className="flex flex-wrap justify-center font-semibold tracking-wide md:justify-end gap-x-6 gap-y-2">
              {menu.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.to}
                  className="transition-colors hover:text-orange-600"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap items-center justify-between mt-8">
          <div className="w-full mb-4 md:w-auto md:mb-0">
              <p className="font-bold font-syne">Elyxian</p>
              {contacts.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {item.icon}
                  <p>{item.text}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col-reverse items-center gap-2">
            <div className="w-full text-sm md:w-auto">
              <p>&copy; {currentYear} Elyxian. All rights reserved.</p>
            </div>
            <div className="flex w-full gap-4 mt-4 md:w-auto md:mt-0">
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-orange-600"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
