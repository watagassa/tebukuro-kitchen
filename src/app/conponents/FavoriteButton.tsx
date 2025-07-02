"use client";

import { Recipe } from "@/app/types";
import {
  addFavorites,
  isFavorited,
  deleteFavorites,
} from "../utils/supabaseFunctionsNew";
import { isLoggedIn } from "../utils/supabaseLogin";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FiHeart } from "react-icons/fi";
import { useRouter } from "next/navigation";

type FavoriteButtonProps = {
  recipe: Recipe;
};

const FavoriteButton = ({ recipe }: FavoriteButtonProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const recipe_id: number = recipe.id; // パラメータのrecipe_idを取得
  const router = useRouter();

  // 既にお気に入りにしているか確認
  useEffect(() => {
    const checkFavorite = async () => {
      const isFavo = await isFavorited(recipe_id);
      setIsFavorite(isFavo);
      setLoading(false);
    };
    checkFavorite();
  }, [recipe_id]);

  // クリックイベント: お気に入りの状態を切り替え、localStorageを更新
  const handleFavoriteClick = async () => {
    if (isFavorite) {
      // お気に入りから削除
      await deleteFavorites(recipe_id);
    } else {
      // お気に入りに追加
      if (await isLoggedIn()) {
        await addFavorites(recipe_id);
      }else{
        router.push(`/login?callbackUrl=${encodeURIComponent(`/${recipe_id}`)}`);
      }
    }

    // isFavoriteの状態を反転
    setIsFavorite(await isFavorited(recipe_id));
  };

  if (loading) {
    return null;
  }

  return (
    <div className="text-center space-y-1" onClick={handleFavoriteClick}>
      <FiHeart
        fill={isFavorite ? "#fa003f" : "#FFFBF4"}
        stroke={isFavorite ? "#fa003f" : "#6b7280"}
        className="size-9 mx-auto"
      />
      <p
        className={clsx(
          "text-xs font-light break-keep",
          isFavorite ? "text-[#fa003f]" : "text-gray-500"
        )}
      >
        お気に入り
      </p>
    </div>
  );
};

export default FavoriteButton;
