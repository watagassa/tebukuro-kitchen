"use client";

import ArticleCard from "@/app/conponents/ArticleCard";
import Footer from "@/app/conponents/Footer";
import Header from "@/app/conponents/Header";
import { Recipe } from "@/app/types";
import { getFavoriteRecipes } from "../utils/supabaseFunctionsNew";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useSwipeable } from "react-swipeable";
import LoadingDataFetch from "@/app/conponents/LoadingDataFetch";
import SearchRecipeFav from "../conponents/SearchRecipeFav";

const Favorites = () => {
  const pathName = usePathname();

  const [listBase, setlistBase] = useState<Recipe[]>([]);
  const [list, setList] = useState<Recipe[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [showHeadFooter, setshowshowHeadFooter] = useState(true);

  //スクロールを検知する
  const handlers = useSwipeable({
    onSwipedUp: () => setshowshowHeadFooter(list.length > 4 ? false : true),
    onSwipedDown: () => setshowshowHeadFooter(true),
    delta: 10,
  });

  useEffect(() => {
    const setRecipes = async() => {
      const favoriteRecipes: Recipe[] = await getFavoriteRecipes();
      if (favoriteRecipes.length > 0) {
        setList(favoriteRecipes);
        setlistBase(favoriteRecipes);
      }
      setIsLoading(false);
    }
    setRecipes();
  }, []);

  const setshowlist = (newrecipeslist: Recipe[]) => {
    setList(newrecipeslist);
  };

  return (
    <div
      {...handlers}
      className="min-h-screen flex flex-col contain-paint bg-[#FFFBF4]"
    >
      <div
        className={`bg-white sticky top-0 px-2 w-full z-20 border-b-2 border-black transition-transform duration-200 ${
          showHeadFooter ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <SearchRecipeFav recipes={listBase} setlist={setshowlist} />
        <Header pathName={pathName} />
      </div>

      {isloading ? (
        <LoadingDataFetch />
      ) : list.length === 0 ? (
        <section className="bg-[#FFFBF4] flex-grow flex flex-col justify-center items-center gap-4 text-black">
          <FiHeart size={55} />
          <p className="font-black text-2xl">
            お気に入りを
            <br />
            登録しよう！
          </p>
        </section>
      ) : (
        <section className="bg-[#FFFBF4] flex-grow grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-min gap-3 p-5">
          {list.map((recipe: Recipe) => (
            <ArticleCard recipe={recipe} key={recipe.id} from="favorites" />
          ))}
        </section>
      )}

      <div
        className={`sticky bottom-0 w-full z-20 transition-transform duration-200 ${
          showHeadFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer pathName={pathName} />
      </div>
    </div>
  );
};

export default Favorites;
