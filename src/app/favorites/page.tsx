"use client";

import Footer from "@/app/conponents/Footer";
import { Recipe } from "@/app/types";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddRecipeCords from "../conponents/AddRecipeCords";
import { supabase } from "../utils/supabase";
import Headertst from "../conponents/Header/Headertst";

const Favorites = () => {
  const [kW, setKW] = useState("")

  const PAGE_SIZE = 4

  //現段階ではサンプルコード
  const fetcher = async (key: string): Promise<Recipe[]> => {
    const [kw, materialKey, pageIndexStr] = key.split('-');
    const pageIndex = Number(pageIndexStr);

    if (kw === "") {
      const { data, error } = await supabase
        .from('Recipes')
        .select('*')
        .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1);

      if (error) throw error;
      return data ?? [];
    } else {
      const { data, error } = await supabase
        .from('Recipes')
        .select()
        .ilike('name', `%${kw}%`)
        .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1);
      //簡単な部分一致検索(参考:https://zenn.dev/417/scraps/b494b081c2c33b)
      if (error) console.error(error)
      return data ?? [] as Recipe[];
    }
  }

  return (
    <div className="min-h-screen flex flex-col contain-paint bg-[#FFFBF4]">
      <div className="sticky top-0 z-20">
        <Headertst setSearchKeyWord={setKW} />
      </div>

      <AddRecipeCords materialKey="favorite" fetcher={fetcher} kw={kW} pageSize={PAGE_SIZE} />

      <div className="sticky bottom-0 w-full z-20" >
        <Footer pathName={usePathname()} />
      </div>
    </div>
  );
};

export default Favorites;
