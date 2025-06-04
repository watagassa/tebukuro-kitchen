import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeSchema, RecipeSchemaType } from "@/app/validations/schema";

export const useRecipeFormTop = () => {
  const methods = useForm<RecipeSchemaType>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      recipe: {
        recipe_name: "",
        recipe_image: undefined,
        recipe_comment: "",
        time: "",
        how_many: "",
      },
      ingredient: [
        { name: "", amount: "" },
        { name: "", amount: "" },
      ],
      descript: [
        { text: "", imageString: "", imageFile: undefined },
        { text: "", imageString: "", imageFile: undefined },
      ],
    },
  });

  const ingredientFieldArray = useFieldArray({
    control: methods.control,
    name: "ingredient",
  });

  const descriptFieldArray = useFieldArray({
    control: methods.control,
    name: "descript",
  });

  return {
    ...methods,
    ingredientFieldArray,
    descriptFieldArray,
  };
};
