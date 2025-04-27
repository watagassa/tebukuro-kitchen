"use client";

import ArticleCard from "@/app/conponents/ArticleCard";
import Footer from "@/app/conponents/Footer";
import Header from "@/app/conponents/Header";
import { Recipe } from "@/app/types";
import { getPageRecipes } from "@/app/utils/supabaseFunctionsNew";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import SearchRecipe from "@/app/conponents/SearchRecipe";

import LoadingDataFetch from "@/app/conponents/LoadingDataFetch";

export default function Home() {
  const pathName = usePathname();
  const [RecipesList, setRecipesList] = useState<Recipe[]>([]); //フィルターされてないレシピ
  const [filRecipes, setFilRecipes] = useState<Recipe[]>([]); //検索時のフィルターされたレシピ
  const [filteringNow, setFilteringNow] = useState(false);
  const [showHeadFooter, setshowshowHeadFooter] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const [allRecipesRetrieved, setAllRecipesRetrieved] = useState(false);
  const [useing, setUseing] = useState(false);
  const [bottom, setBottom] = useState(false);
  // 無限スクロール用のState
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const loader = useRef(null);
  // スクロールで底に行ったらpageRecipeを更新
  useEffect(() => {
    // 全部のレシピを取ってこれてたらやらない
    if (!allRecipesRetrieved) {
      getPageRecipes(page, RecipesList, setRecipesList, setAllRecipesRetrieved);
    }
    if (filteringNow) {
      const filteredRecipes = RecipesList.filter((recipe) => {
        return recipe.name.includes(input);
      });
      if (!allRecipesRetrieved) {
        // 検索してフィルターしたレシピをセット
        if (filteredRecipes.length === filRecipes.length) {
          setPage((prev) => prev + 1);
        }
      }
      setFilRecipes(filteredRecipes);
    }
    // inputが''でない時は検索中
  }, [page]);

  // TODO もっと綺麗なコードで行う
  useEffect(() => {
    RecipesList.length >= 1 ? setIsLoading(false) : null;
  }, [RecipesList.length]);

  function mySleep(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  async function asyncMyFunc() {
    setUseing(true);
    await mySleep(100); // 100ミリ秒停止
    setPage((prev) => prev + 1);
    setUseing(false);
  }
  // 初期状態でも実行する
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targetElement = targetRef.current;

    if (!targetElement) return;
    // 初期状態のチェック
    const rect = targetElement.getBoundingClientRect();
    // if (!state) {
    if (rect.top < window.innerHeight && rect.bottom > 0 && !useing) {
      asyncMyFunc();
    } else {
      setBottom(false);
    }
    // }
  }, [RecipesList, page, bottom]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setBottom(true);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      console.log("unobserve");
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);
  //スクロールを検知する
  const handlers = useSwipeable({
    onSwipedUp: () => setshowshowHeadFooter(false),
    onSwipedDown: () => setshowshowHeadFooter(true),
    delta: 60,
  });
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
        <SearchRecipe
          setInput={setInput}
          recipes={RecipesList}
          setFilRecipes={setFilRecipes}
          setFilteringNow={setFilteringNow}
        />
        <Header pathName={pathName} />
      </div>
      {/* 検索中なら filRecipesを、そうでないならRecipesListを表示*/}
      {isloading ? (
        <LoadingDataFetch />
      ) : (
        <div
          className={`bg-[#FFFBF4] border-none flex-grow grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-min gap-5 p-5`}
        >
          {filteringNow
            ? filRecipes.map((filRecipe) => {
                return <ArticleCard key={filRecipe.id} recipe={filRecipe} />;
              })
            : RecipesList.map((recipe) => {
                return <ArticleCard key={recipe.id} recipe={recipe} />;
              })}
        </div>
      )}
      <div ref={targetRef}>targetRef</div>
      <div ref={loader}>loading</div>
      <div
        className={`sticky bottom-0 w-full z-20 transition-transform duration-200 ${
          showHeadFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer pathName={pathName} />
      </div>
    </div>
  );
}
