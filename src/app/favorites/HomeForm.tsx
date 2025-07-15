"use client";

import Footer from "@/app/conponents/Footer";
import { createContext, useState } from "react";
import Header from "../conponents/Header/Header";
import AddRecipeCords from "../conponents/AddRecipeCords";
import { favoriteFetcher, searchFavFeatcher } from "../utils/supabase/recipe";

export const kWFavContext = createContext(
  {} as { searchKW: string; setSearchKW: (kW: string) => void },
);

export default function HomeForm() {
  const [searchKW, setSearchKW] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF4] contain-paint">
      <kWFavContext.Provider value={{ searchKW, setSearchKW }}>
        <div className={`sticky top-0 z-20`}>
          <Header />
        </div>

        <AddRecipeCords
          materialKey="favorites"
          fetcher={searchKW === "" ? favoriteFetcher : searchFavFeatcher}
        />

        <div
          className={`sticky bottom-0 z-20 w-full transition-transform duration-200`}
        >
          <Footer pathName="/" />
        </div>
      </kWFavContext.Provider>
    </div>
  );
}
