import { notFound } from "next/navigation";
import { getDetailRecipebyId } from "@/app/utils/supabaseFunctionsNew";
import RecipeDetailClient from "./getDetailRecipe";

export default async function RecipeIdPage({
  params,
  searchParams,
}: {
  params: { recipe_id: number };
  searchParams: { from: string };
}) {
  let recipeData;
  try {
    recipeData = await getDetailRecipebyId(params.recipe_id);
  } catch (error: any) {
    if (error.code === "404") {
      notFound();
    }
    throw error;
  }

  // 取得したデータをクライアントコンポーネントにpropsとして渡します
  return (
    <RecipeDetailClient
      recipe={recipeData}
      params={params}
      searchParams={searchParams}
    />
  );
}
