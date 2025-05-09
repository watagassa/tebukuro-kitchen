import React, { Dispatch, SetStateAction, useState } from "react";
import { Recipe } from "@/app/types";
import { FiSearch } from "react-icons/fi";

type propsType = {
  setInput: Dispatch<SetStateAction<string>>;
  recipes: Recipe[];
  // 検索中のレシピ配列をセットする
  setFilRecipes: Dispatch<SetStateAction<Recipe[]>>;
  // 検索中の場合かどうかを判断する
  setFilteringNow: Dispatch<SetStateAction<boolean>>;
};

const SearchRecipe: React.FC<propsType> = (props: propsType) => {
  //検索ボックスのステート
  const [input, setinput] = useState<string>("");

  //エンターを押したら検索結果が親のRecipe[]のステートがセットされる
  const filerandsetter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      input !== "" ? props.setFilteringNow(true) : props.setFilteringNow(false);
      props.setInput(input);
    }
  };
  // useEffect(() => {
  //   const filteredRecipes = props.recipes.filter((recipe) => {
  //     return recipe.name.includes(input);
  //   });
  //   // 検索してフィルターしたレシピをセット
  //   props.setFilRecipes(filteredRecipes);
  // }, [props.recipes]);
  //ばつボタン用のリスト初期化関数
  const resetRicipes = () => {
    setinput("");
  };

  return (
    <div className="mt-2 px-1 w-full flex items-center bg-gray-200 rounded-2xl">
      <FiSearch size={27} color="gray" className="ms-3 h-12" />
      <input
        type="text"
        value={input}
        onChange={(event) => {
          setinput(event.target.value);
          event.target.value === "" ? props.setFilteringNow(false) : null;
        }}
        onKeyDown={filerandsetter}
        placeholder="レシピを検索"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        className="ps-2 pe-6 w-full text-lg border-spacing-4 bg-gray-200 border-gray-50 rounded-2xl outline-none"
      />
      <button className="mr-4 ml-3 right-10 text-black" onClick={resetRicipes}>
        ✕
      </button>
    </div>
  );
};

export default SearchRecipe;
