"use client";
import { inputDescript } from "@/app/types";
import { RecipeSchemaType } from "@/app/validations/schema";
import Image from "next/image";
import { useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BiCameraOff, BiPlus } from "react-icons/bi";

interface DescriptInputItem {
  errors: FieldErrors<RecipeSchemaType>;
  register: UseFormRegister<RecipeSchemaType>;
  inputItems: inputDescript[];
  setInputItems: React.Dispatch<React.SetStateAction<inputDescript[]>>;
  setValue: UseFormSetValue<RecipeSchemaType>;
}
const DescriptInputItem = ({
  errors,
  register,
  inputItems,
  setInputItems,
  setValue,
}: DescriptInputItem) => {
  const maxInputs = 6;

  useEffect(() => {
    inputItems.map((input, index) => {
      setValue(`descript.${index}.text`, input.text || "");
    });
  }, [inputItems, setValue]);

  const addInput = () => {
    if (inputItems.length < maxInputs) {
      setInputItems([...inputItems, { image: undefined, text: "" }]);
    }
  };

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newInputItems = [...inputItems];
    newInputItems[index].text = e.target.value;
    setInputItems(newInputItems);
  };

  const handleImageUpload =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newInputItems = [...inputItems];
          newInputItems[index].imageFile = file;
          newInputItems[index].image = reader.result as string;
          setInputItems(newInputItems);
        };
        reader.readAsDataURL(file);
      }
    };
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">
        {inputItems.map((inputItem, index) => (
          <div key={index}>
            <div className="relative mb-3 flex h-32 items-center justify-center bg-gray-100 shadow-md">
              {inputItem.image ? (
                <>
                  <Image
                    src={inputItem.image}
                    alt=""
                    className="object-cover"
                    fill
                  />
                  <button
                    title="画像"
                    className="absolute right-0 top-0 m-2 flex size-5 items-center justify-center rounded-full bg-gray-400 shadow-lg"
                  >
                    <BiPlus className="rotate-45 text-2xl text-white" />
                  </button>
                </>
              ) : null}
              {!inputItem.image && (
                <BiCameraOff className="text-2xl text-gray-400" />
              )}
              <input
                {...register(`descript.${index}.imageFile`)}
                title="画像"
                type="file"
                accept="image/*"
                onChange={handleImageUpload(index)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </div>
            {/* zodのエラー文 */}
            <div className="text-red-500">
              {errors.descript !== undefined ? (
                <div>{errors.descript[index]?.imageFile?.message}</div>
              ) : null}
            </div>
            <div className="flex bg-white">
              <p className="m-1 flex size-4 flex-shrink-0 items-center justify-center rounded-sm bg-orange-400 text-xs font-semibold text-white">
                {index + 1} {/* 番号表示 */}
              </p>
              <textarea
                {...register(`descript.${index}.text`)}
                className="h-16 w-full resize-none pt-1 text-[10px]"
                placeholder="フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。"
                style={{ outline: "none" }}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            {/* zodのエラー文 */}
            <div className="text-red-500">
              {errors.descript !== undefined ? (
                <div>{errors.descript[index]?.text?.message}</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addInput}
        disabled={inputItems.length >= maxInputs}
        className="mx-auto my-4 flex text-orange-400"
      >
        <BiPlus className="text-2xl" />
        <p>項目を増やす</p>
      </button>
    </>
  );
};
export default DescriptInputItem;
