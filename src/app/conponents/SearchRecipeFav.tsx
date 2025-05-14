import { useState } from "react";

import { FiSearch } from "react-icons/fi";

import { Recipe } from "@/app/types";

type propsType = {
  recipes: Recipe[];
  setlist: (recipes: Recipe[]) => void; //親のステート
};

const SearchRecipeFav: React.FC<propsType> = (props: propsType) => {
  //検索ボックスのステート
  const [input, setinput] = useState<string>("");

  //エンターを押したら検索結果が親のRecipe[]のステートがセットされる
  const filerandsetter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const filteredRecipes = props.recipes.filter((recipe) => {
        return recipe.name.includes(input);
      });
      props.setlist(filteredRecipes);
    }
  };

  return (
    <div className="mt-2 px-1 w-full flex items-center bg-gray-200 rounded-2xl">
      <FiSearch size={27} color="gray" className="ms-3 h-12" />
      <input
        type="text"
        value={input}
        onChange={(event) => {
          setinput(event.target.value);
        }}
        onKeyDown={filerandsetter}
        placeholder="レシピを検索"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        className="ps-2 pe-6 w-full text-lg border-spacing-4 bg-gray-200 border-gray-50 rounded-2xl focus:outline-none"
      />
      <button
        className="mr-4 ml-3 right-10"
        onClick={() => {
          setinput("");
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default SearchRecipeFav;
