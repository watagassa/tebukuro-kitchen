"use client";

import {
  FieldErrors,
  UseFormRegister,
  UseFieldArrayReturn,
} from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { RecipeSchemaType } from "@/app/validations/schema";

interface IngredientInputItemProps {
  errors: FieldErrors<RecipeSchemaType>;
  register: UseFormRegister<RecipeSchemaType>;
  fieldArray: UseFieldArrayReturn<RecipeSchemaType, "ingredient", "id">;
}

const IngredientInputItem = ({
  errors,
  register,
  fieldArray,
}: IngredientInputItemProps) => {
  const maxInputs = 5;
  const { fields, append, remove } = fieldArray;

  const addInput = () => {
    if (fields.length < maxInputs) {
      append({ name: "", amount: "" });
    }
  };

  return (
    <div className="mt-4">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-2 flex items-start justify-between gap-2"
        >
          <section className="flex-1 space-y-1">
            <input
              {...register(`ingredient.${index}.name`)}
              type="text"
              placeholder="材料名"
              className="h-10 w-full rounded-md border border-orange-200 p-2"
              inputMode="text"
              autoCorrect="off"
            />

            {/* zodのエラー文 */}
            <div className="text-xs text-red-500">
              {errors?.ingredient?.[index]?.name?.message}
            </div>
          </section>

          <section className="flex-1 space-y-1">
            <input
              {...register(`ingredient.${index}.amount`)}
              type="text"
              placeholder="分量"
              className="h-10 w-full rounded-md border border-orange-200 p-2"
              inputMode="text"
              autoCorrect="off"
            />
            {/* zodのエラー文 */}
            <div className="text-xs text-red-500">
              {errors?.ingredient?.[index]?.amount?.message}
            </div>
          </section>

          {/* 削除用ボタン */}
          {fields.length > 1 && (
            <button
              onClick={() => remove(index)}
              className="mt-2 self-start text-red-500"
            >
              <BiTrash className="text-2xl" />
            </button>
          )}
        </div>
      ))}

      {fields.length < maxInputs && (
        <button
          type="button"
          onClick={addInput}
          disabled={fields.length >= maxInputs}
          className="mx-auto my-5 flex items-center rounded-sm border border-dashed border-orange-400 px-10 py-1 text-orange-400"
        >
          <BiPlus className="text-lg" />
          <p className="text-sm">材料を追加</p>
        </button>
      )}
    </div>
  );
};

export default IngredientInputItem;
