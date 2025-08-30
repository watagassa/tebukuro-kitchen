import { Recipe } from "../types";
import UserRecipeItem from "./UserRecipeItem";

const UserRecipeList = ({
  user_id,
  userRecipe,
  pageType,
}: {
  user_id: string;
  userRecipe: Recipe[];
  pageType: "self" | "other";
}) => {
  return (
    <section className="mx-2 max-h-[36rem] overflow-y-scroll rounded-xl bg-white">
      {userRecipe != undefined ? (
        <>
          {userRecipe.map((recipe: Recipe) => (
            <UserRecipeItem
              user_id={pageType === "self" ? user_id : undefined}
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              image_url={recipe.image_url}
            />
          ))}
          <p className="flex justify-center p-8 font-semibold text-gray-400">
            保存されたレシピは以上です
          </p>
        </>
      ) : (
        <p className="flex justify-center p-8 font-semibold text-gray-400">
          レシピがありません。
        </p>
      )}
    </section>
  );
};

export default UserRecipeList;
