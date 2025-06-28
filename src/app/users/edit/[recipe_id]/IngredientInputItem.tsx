"use client";
import { InputIngredient } from "@/app/types";
import { RecipeSchemaType } from "@/app/validations/schema";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
interface IngredientInputItem {
  errors: FieldErrors<RecipeSchemaType>;
  register: UseFormRegister<RecipeSchemaType>;
  inputs: InputIngredient[];
  setInputs: Dispatch<SetStateAction<InputIngredient[]>>;
  setValue: UseFormSetValue<RecipeSchemaType>;
}
const IngredientInputItem = ({
  errors,
  register,
  inputs,
  setInputs,
  setValue,
}: IngredientInputItem) => {
  const maxInputs = 5;

  useEffect(() => {
    inputs.map((input, index) => {
      setValue(`ingredient.${index}.name`, input.name);
      setValue(`ingredient.${index}.amount`, input.amount);
      console.log(input, index);
    });
  }, [inputs, setValue]);

  const addInput = () => {
    if (inputs.length < maxInputs) {
      setInputs([...inputs, { name: "", amount: "" }]);
    }
  };

  const handleInputNameChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newInputItems = [...inputs];
    newInputItems[index].name = e.target.value;
    setInputs(newInputItems);
  };
  const handleInputAmountChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newInputItems = [...inputs];
    newInputItems[index].amount = e.target.value;
    setInputs(newInputItems);
  };

  // 削除関数（試作）
  //   const removeInput = (index: number) => {
  //     const newInputs = inputs.filter((_, i) => i !== index);
  //     setInputs(newInputs);
  //   };

  return (
    <div className="mt-4">
      {inputs.map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="w-full border-b border-gray-400 bg-[#FEF9EC] pl-3">
            <input
              {...register(`ingredient.${index}.name`)}
              type="text"
              name={`ingredient.${index}.name`}
              id={`ingredient.${index}.name`}
              style={{ outline: "none" }}
              placeholder="材料  /例  たまご"
              onChange={(e) => handleInputNameChange(index, e)}
              className="h-[40px] w-full border-gray-400 bg-[#FEF9EC] pl-3"
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
              onChange={(e) => handleInputAmountChange(index, e)}
              className="h-[40px] w-full border-gray-400 bg-[#FEF9EC] pl-3"
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
        className="mx-auto my-4 flex text-orange-400"
      >
        <BiPlus className="text-2xl" />
        <p>項目を増やす</p>
      </button>
    </div>
  );
};

export default IngredientInputItem;
