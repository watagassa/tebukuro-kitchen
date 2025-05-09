import { useForm } from "react-hook-form";
import { RecipeSchema, RecipeSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
export const useRecipeFormTop = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RecipeSchemaType>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      recipe: { recipe_name: "", recipe_comment: "", time: "", how_many: "" },
      ingredient: [
        { name: "", amount: "" },
        { name: "", amount: "" },
      ],
      descript: [
        { text: "", image: undefined },
        { text: "", image: undefined },
      ],
    },
  });
  return {
    register,
    handleSubmit:handleSubmit,
    setValue,
    // onSubmit: onSubmit,
    errors,
  };
};
