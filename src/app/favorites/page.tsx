"use client";

import ArticleCard from "@/app/conponents/ArticleCard";
import Footer from "@/app/conponents/Footer";
import Header from "@/app/conponents/Header";
import { Recipe } from "@/app/types";
import { getFavoriteRecipes } from "@/app/utils/localstorageFunction";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";

const Favorites = () => {
  const pathName = usePathname();

  const [list, setList] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favoriteRecipes: Recipe[] = getFavoriteRecipes();
    if (favoriteRecipes.length > 0) setList(favoriteRecipes);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header pathName={pathName} />

      {loading ? (
        <div className="bg-[#FFFBF4] flex-grow"></div>
      ) : list.length === 0 ? (
        <div className="bg-[#FFFBF4] flex-grow flex flex-col justify-center items-center gap-4">
          <FiHeart size={55} />
          <p className="font-black text-2xl">
            お気に入りを
            <br />
            登録しよう！
          </p>
        </div>
      ) : (
        <div className="bg-[#FFFBF4] flex-grow grid grid-cols-2 auto-rows-min gap-5 p-5">
          {list.map((recipe: Recipe) => (
            <ArticleCard recipe={recipe} key={recipe.id} from="favorites" />
          ))}
        </div>
      )}

      <Footer pathName={pathName} />
    </div>
  );
};

export default Favorites;
