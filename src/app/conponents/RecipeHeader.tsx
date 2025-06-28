import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

type RecipeHeaderProps = {
  bgColor: string;
  textColor: string;
  title: string;
  link: string;
  iconFill: string;
};

const RecipeHeader = (props: RecipeHeaderProps) => {
  const { bgColor, textColor, title, link, iconFill } = props;
  return (
    <header
      className={`sticky top-0 flex w-full items-center border-b border-gray-400 p-5 shadow-md ${bgColor} z-40`}
    >
      <Link href={link} className="absolute left-5 text-3xl">
        <IoIosArrowBack fill={iconFill} />
      </Link>
      <p
        className={`flex-1 text-center text-xl font-semibold ${textColor} truncate pl-10 pr-11`}
      >
        {title}
      </p>
    </header>
  );
};

export default RecipeHeader;
