import Link from "next/link";
import clsx from "clsx";

type headerProp = {
  pathName: string;
};

const Header = ({ pathName }: headerProp) => {
  const tabs = [
    { label: "レシピ", path: "/" },
    { label: "お気に入り", path: "/favorites" },
  ];

  return (
    <div className="bg-white w-full pt-2 pb-1">
      <div className="flex">
        {tabs.map(({ label, path }) => {
          const isActive: boolean = pathName === path;
          const borderClass: string = clsx({
            "border-b-4 border-orange-400": isActive,
          });

          return (
            <div key={path} className="w-1/2 flex justify-center text-black">
              <Link href={path}>
                <p className={`px-4 py-2 ${borderClass}`}>{label}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
