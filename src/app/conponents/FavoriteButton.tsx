"use client";

import { useEffect, useState } from "react";

import { FiHeart } from "react-icons/fi";

import { Recipe } from "@/app/types";
import {
  addFavorites,
  isFavorited,
  deleteFavorites,
} from "@/app/utils/supabaseFunctionsNew";

type FavoriteButtonProps = {
  recipe: Recipe;
};

const FavoriteButton = ({ recipe }: FavoriteButtonProps) => {
  const recipe_id: number = recipe.id;
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // レンダリング時にDBを確認し、レシピが既にお気に入りにあるかを判定
  useEffect(() => {
    const checkFavorite = async () => {
      const isFavo = await isFavorited(recipe_id);
      setIsFavorite(isFavo);
      setLoading(false);
    };
    checkFavorite();
  }, [recipe_id]);

  // クリックイベント: お気に入りの状態を切り替え、DBを更新
  const handleFavoriteClick = async () => {
    if (isFavorite) {
      // お気に入りから削除
      await deleteFavorites(recipe_id);
    } else {
      // お気に入りに追加
      await addFavorites(recipe_id);
    }

    // isFavoriteの状態を反転
    setIsFavorite(await isFavorited(recipe_id));
  };
  if (loading) return null;

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
