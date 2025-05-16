"use client";

import Footer from "@/app/conponents/Footer";
import { createContext, useState } from "react";
import { number, string } from "zod";
import Header from "../conponents/Header/Header";
import AddRecipeCords from "../conponents/AddRecipeCords";
import { Homefetcher_SWR, PAGE_SIZE_SWR, } from "../utils/supabaseFunctionsNew";

export const kWContext = createContext({} as (kW: string) => void);

export default function HomeForm() {
  const [searchkW, setSearchKW] = useState('');

  return (
    <div className="  min-h-screen flex flex-col contain-paint bg-[#FFFBF4]">
      <kWContext.Provider value={setSearchKW}>
        <div className={`sticky top-0 z-20`}>
          <Header />
        </div>

        <AddRecipeCords materialKey="Recipe" fetcher={Homefetcher_SWR} kw={searchkW} pageSize={PAGE_SIZE_SWR} />

        <div className={` sticky bottom-0 w-full z-20 transition-transform duration-200 `}>
          <Footer pathName='/' />
        </div>
      </ kWContext.Provider>
    </div >
  );
}
