"use client";

import Footer from "@/app/conponents/Footer";

import { useState } from "react";
import AddRecipeCords from "../conponents/AddRecipeCords";

import Headertst from "../conponents/Header/Header";
import { PAGE_SIZE_SWR, favoritesFetcher } from "../utils/supabaseFunctionsNew";

const Favorites = () => {
  const [kW] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF4] contain-paint">
      <div className={`sticky top-0 z-20`}>
        <Headertst />
      </div>

      <AddRecipeCords
        materialKey="favorite"
        fetcher={favoritesFetcher}
        kw={kW}
        pageSize={PAGE_SIZE_SWR}
      />

      <div
        className={`sticky bottom-0 z-20 w-full transition-transform duration-200`}
      >
        <Footer pathName="/" />
      </div>
    </div>
  );
};

export default Favorites;
