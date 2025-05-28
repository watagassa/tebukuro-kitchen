"use client";
import { Dispatch, SetStateAction } from "react";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BiPlus } from "react-icons/bi";

import { InputIngredient } from "@/app/types";
import { RecipeSchemaType } from "@/app/validations/schema";

interface IngredientInputItem {
  errors: FieldErrors<RecipeSchemaType>;
  register: UseFormRegister<RecipeSchemaType>;
  inputs: InputIngredient[];
  setInputs: Dispatch<SetStateAction<InputIngredient[]>>;
}
const IngredientInputItem = ({
  errors,
  register,
  inputs,
  setInputs,
}: IngredientInputItem) => {
  const maxInputs = 5;

  const addInput = () => {
    if (inputs.length < maxInputs) {
      setInputs([...inputs, { name: "", amount: "" }]);
    }
  };

  // 削除関数（試作）
  //   const removeInput = (index: number) => {
  //     const newInputs = inputs.filter((_, i) => i !== index);
  //     setInputs(newInputs);
  //   };

  return (
    <div className="mt-4">
      {inputs.map((_, index) => (
        <div key={index} className="flex justify-between gap-2 mb-2">
          <section className="flex-1">
            <input
              {...register(`ingredient.${index}.name`)}
              type="text"
              name={`ingredient.${index}.name`}
              id={`ingredient.${index}.name`}
              placeholder="材料名"
              className="w-full p-2 h-10 border border-orange-200 rounded-md"
              autoCapitalize="off"
              autoCorrect="off"
            />

            {/* zodのエラー文 */}
            <div className="text-red-500">
              {errors?.ingredient?.[index]?.name?.message}
            </div>
          </section>

          <section className="flex-1">
            <input
              {...register(`ingredient.${index}.amount`)}
              type="text"
              name={`ingredient.${index}.amount`}
              id={`ingredient.${index}.amount`}
              placeholder="分量"
              className="w-full p-2 h-10 border border-orange-200 rounded-md"
              autoCapitalize="off"
              autoCorrect="off"
            />
            {/* zodのエラー文 */}
            <div className="text-red-500">
              {errors?.ingredient?.[index]?.amount?.message}
            </div>
          </section>

          {/* 削除用ボタン */}
          {/* <button onClick={() => removeInput(index)} className="text-red-500">
            
            <BiTrash className="text-2xl" />
            </button> */}
        </div>
      ))}

      <button
        type="button"
        onClick={addInput}
        disabled={inputs.length >= maxInputs}
        className="flex items-center mx-auto my-5 px-10 py-1 rounded-sm text-orange-400 border border-dashed border-orange-400"
      >
        <BiPlus className="text-lg" />
        <p className="text-sm">材料を追加</p>
      </button>
    </div>
  );
};

export default IngredientInputItem;
