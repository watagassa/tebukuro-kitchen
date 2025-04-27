"use client";

import { Recipe } from "@/app/types";
import {
  addFavorites,
  isFavorited,
  deleteFavorites,
} from "../utils/supabaseFunctionsNew";
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";

type FavoriteButtonProps = {
  recipe: Recipe;
};

const FavoriteButton = ({ recipe }: FavoriteButtonProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const recipe_id: number = recipe.id; // パラメータのrecipe_idを取得

  // レンダリング時にlocalStorageを確認し、記事が既にお気に入りにあるかを判定
  useEffect(() => {
    const checkFavorite = async () => {
      const isFavo = await isFavorited(recipe_id)
      setIsFavorite(isFavo);
      setLoading(false);
    }
    checkFavorite();
  }, [recipe_id]);

  // クリックイベント: お気に入りの状態を切り替え、localStorageを更新
  const handleFavoriteClick = async () => {
    if (isFavorite) {
      // お気に入りから削除
      await deleteFavorites(recipe_id)
    } else {
      // お気に入りに追加
      await addFavorites(recipe_id)
    }

    // isFavoriteの状態を反転
    setIsFavorite(await isFavorited(recipe_id));
  };
  useEffect(() => {
    console.log("FAVO",isFavorite)
  },[isFavorite])

  if (loading) {
    return null;
  }

  return (
    <div className="text-center space-y-1" onClick={handleFavoriteClick}>
      <FiHeart
        fill={isFavorite ? "#fa003f" : "#FFFBF4"}
        stroke={isFavorite ? "#fa003f" : "#807E7E"}
        className="size-9 mx-auto"
      />
      <p
        className={`text-xs font-light break-keep ${
          isFavorite ? "text-[#fa003f]" : "text-gray-500"
        }`}
      >
        お気に入り
      </p>
    </div>
  );
};

export default FavoriteButton;
