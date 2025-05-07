"use client";

import Footer from "@/app/conponents/Footer";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AddRecipeCords from "./conponents/AddRecipeCords";;
import { Recipe } from "./types";
import { supabase } from "./utils/supabase";
import { number, string } from "zod";
import Headertst from "./conponents/Header/Headertst";

export default function Home() {
  const [kW, setKW] = useState("")

  const PAGE_SIZE = 10;

  //現段階ではサンプルコード
  const fetcher = async (key: string): Promise<Recipe[]> => {
    const [kw, materialKey, pageIndexStr] = key.split('-');
    const pageIndex = Number(pageIndexStr);

    if (kw === "") {
      console.log('fetcher()')
      const { data, error } = await supabase
        .from('Recipes')
        .select('*')
        .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1);

      if (error) throw error;
      return data ?? [];
    } else {
      console.log('fetcher(kw):', kw)
      const { data, error } = await supabase
        .from('Recipes')
        .select()
        .ilike('name', `%${kW}%`)
        .range(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE - 1);
      //簡単な部分一致検索(参考:https://zenn.dev/417/scraps/b494b081c2c33b)
      if (error) console.error(error)
      return data ?? [] as Recipe[];
    }
  }

  return (
    <div className="  min-h-screen flex flex-col contain-paint bg-[#FFFBF4]">
      <div className={`sticky top-0 z-20`}>
        <Headertst setSearchKeyWord={setKW} />
      </div>

      <AddRecipeCords materialKey="Recipe" fetcher={fetcher} kw={kW} pageSize={PAGE_SIZE} />

      <div className={` sticky bottom-0 w-full z-20 transition-transform duration-200 `}>
        <Footer pathName={usePathname()} />
      </div>
    </div >
  );
}
