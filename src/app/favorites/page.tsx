"use client";

import Footer from "@/app/conponents/Footer";
import { Recipe } from "@/app/types";

import { getFavoriteRecipes } from "../utils/supabaseFunctionsNew";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddRecipeCords from "../conponents/AddRecipeCords";
import { supabase } from "../utils/supabase";
import Headertst from "../conponents/Header/Header";
import { favoritesFetcher_SWR, PAGE_SIZE_SWR } from "../utils/supabaseFunctionsNew";

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

  const [kW, setKW] = useState("")


  return (
    <div className="min-h-screen flex flex-col contain-paint bg-[#FFFBF4]">
      <div className="sticky top-0 z-20">
        <Headertst setSearchKeyWord={setKW} />
      </div>

      <AddRecipeCords materialKey="favorite" fetcher={favoritesFetcher_SWR} kw={kW} pageSize={PAGE_SIZE_SWR} />

      <div className="sticky bottom-0 w-full z-20" >
        <Footer pathName='/favorites' />
      </div>
    </div>
  );
};

export default Favorites;
