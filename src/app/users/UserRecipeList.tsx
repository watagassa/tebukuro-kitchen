import { Recipe } from "../types";
import UserRecipeItem from "./UserRecipeItem";

const UserRecipeList = ({
  user_id,
  userRecipe,
}: {
  user_id: string;
  userRecipe: Recipe[];
}) => {
  return (
    <section className="mx-2 max-h-[36rem] overflow-y-scroll rounded-xl bg-white">
      {userRecipe != undefined ? (
        <>
          {userRecipe.map((recipe: Recipe) => (
            <UserRecipeItem
              user_id={user_id}
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
