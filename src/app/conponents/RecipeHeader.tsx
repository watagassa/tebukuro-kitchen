import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

type RecipeHeaderProps = {
  bgColor: string;
  textColor: string;
  title: string;
  link: string;
  iconFill: string;
};

const RecipeHeader = ({
  bgColor,
  textColor,
  title,
  link,
  iconFill,
}: RecipeHeaderProps) => {
  return (
    <header
      className={`sticky top-0 w-full flex items-center p-5 border-b border-gray-400 shadow-md ${bgColor} z-40`}
    >
      <Link href={link} className="absolute left-5 text-3xl">
        <IoIosArrowBack fill={iconFill} />
      </Link>
      <p
        className={`flex-1 text-center text-xl font-semibold ${textColor} pl-10 pr-11 truncate`}
      >
        {title}
      </p>
    </header>
  );
};

export default RecipeHeader;
