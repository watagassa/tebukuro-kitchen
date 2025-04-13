"use client";
import { useEffect, useState, useRef } from "react";
// import { Recipe } from "../types";
// import { getPageRecipes } from "../utils/supabaseFunctions";

export default function MyComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [page, setPage] = useState(1);
  //   const [pageRecipe, setPageRecipe] = useState<Recipe[]>([]);
  const loader = useRef(null);
  useEffect(() => {
    // getPageRecipes(page,pageRecipe,setPageRecipe)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  return (
    <div>
      {/* {pageRecipe.map((item) => (
        <div key={item.id} className='mb-20'>id={item.id}{item.name}</div>
      ))} */}
      <div ref={loader}>Loading more...</div>
    </div>
  );
}
