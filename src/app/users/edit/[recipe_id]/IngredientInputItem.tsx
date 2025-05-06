"use client";
import { InputIngredient } from "@/app/types";
import { RecipeSchemaType } from "@/app/validations/schema";
import { Dispatch, SetStateAction } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
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
      {inputs.map((input, index) => (
        <div key={index} className="flex gap-4 items-center ">
          <div className="w-full border-b border-gray-400 pl-3 bg-[#FEF9EC]">
            <input
              {...register(`ingredient.${index}.name`)}
              type="text"
              name={`ingredient.${index}.name`}
              id={`ingredient.${index}.name`}
              style={{ outline: "none" }}
              placeholder="材料  /例  たまご"
              className="w-full  border-gray-400 pl-3 bg-[#FEF9EC] h-[40px]"
            />

            {/* zodのエラー文 */}
            {errors?.ingredient !== undefined ? (
              errors?.ingredient[index]?.name !== undefined ? (
                <div className="text-red-500">
                  {errors?.ingredient[index]?.name?.message}
                </div>
              ) : null
            ) : null}
          </div>

          <div className="w-1/2 border-b border-gray-400 bg-[#FEF9EC]">
            <input
              {...register(`ingredient.${index}.amount`)}
              type="text"
              name={`ingredient.${index}.amount`}
              id={`ingredient.${index}.amount`}
              style={{ outline: "none" }}
              placeholder="分量  /例  2個"
              className="w-full border-gray-400 pl-3 bg-[#FEF9EC] h-[40px]"
            />
            {/* zodのエラー文 */}
            {errors?.ingredient !== undefined ? (
              errors?.ingredient[index]?.amount !== undefined ? (
                <div className="text-red-500">
                  {errors?.ingredient[index]?.amount?.message}
                </div>
              ) : null
            ) : null}
          </div>

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
        className="flex mx-auto my-4 text-orange-400"
      >
        <BiPlus className="text-2xl" />
        <p>項目を増やす</p>
      </button>
    </div>
  );
};

export default IngredientInputItem;
