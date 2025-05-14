import RecipeDatail from "@/app/[recipe_id]/RecipeDetail";
import { DetailRecipe } from "@/app/types";
import { getDetailRecipebyId } from "@/app/utils/supabaseFunctionsNew";

export default async function RecipeId({
  params,
  searchParams,
}: {
  params: { recipe_id: number };
  searchParams: { from?: string };
}) {

  const detailRecipe: DetailRecipe = await getDetailRecipebyId(
    params.recipe_id
  );

  return (
    <RecipeDatail
      detailRecipe={detailRecipe}
      params={params}
      searchParams={searchParams}
    />
  );
}
