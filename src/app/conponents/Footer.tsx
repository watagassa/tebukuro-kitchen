import Link from "next/link";

import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

type FooterProps = {
  pathName: string;
};

const Footer = ({ pathName }: FooterProps) => {
  const items = [
    {
      href: "/",
      label: "さがす",
      icon: FiSearch,
    },
    {
      href: "/registration",
      label: "登録",
      icon: CgFileDocument,
    },
    {
      href: "/users",
      label: "マイページ",
      icon: AiOutlineUser,
    },
  ];

  return (
    <footer className="border-t-2 border-gray-400 w-full h-16 pt-1 flex justify-center bg-white">
      {items.map(({ href, label, icon: Icon }) => {
        const isActive: boolean = pathName === href;
        const textColor: string = `text-${
          isActive ? "orange-600" : "gray-600"
        }`;

        return (
          <Link className="w-1/3" href={href} key={href}>
            <Icon size={22} className={`mx-auto w-fit ${textColor}`} />
            <p className={`text-xs w-fit mx-auto ${textColor}`}>{label}</p>
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;
