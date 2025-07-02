"use client";

import Footer from "@/app/conponents/Footer";
import { createContext, useState } from "react";
import Header from "../conponents/Header/Header";
import AddRecipeCords from "../conponents/AddRecipeCords";
import {
  getRecipes_tst,
  PAGE_SIZE_SWR,
  searchFetcher_tst,
} from "../utils/supabaseFunctionsNew";

export const kWContext = createContext(
  {} as { searchKW: string; setSearchKW: (kW: string) => void },
);

export default function HomeForm() {
  const [searchKW, setSearchKW] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF4] contain-paint">
      <kWContext.Provider value={{ searchKW, setSearchKW }}>
        <div className={`sticky top-0 z-20`}>
          <Header />
        </div>

        <AddRecipeCords
          materialKey={searchKW === "" ? "Recipe" : searchKW}
          fetcher={searchKW === "" ? getRecipes_tst : searchFetcher_tst}
          kw={searchKW}
          pageSize={PAGE_SIZE_SWR}
        />

        <div
          className={`sticky bottom-0 z-20 w-full transition-transform duration-200`}
        >
          <Footer pathName="/" />
        </div>
      </kWContext.Provider>
    </div>
  );
}
