"use client";
import Image from "next/image";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { TbCameraPlus } from "react-icons/tb";

import { inputDescript } from "@/app/types";
import { RecipeSchemaType } from "@/app/validations/schema";

interface DescriptInputItem {
  errors: FieldErrors<RecipeSchemaType>;
  register: UseFormRegister<RecipeSchemaType>;
  inputItems: inputDescript[];
  setInputItems: React.Dispatch<React.SetStateAction<inputDescript[]>>;
}
const DescriptInputItem = ({
  errors,
  register,
  inputItems,
  setInputItems,
}: DescriptInputItem) => {
  const maxInputs = 6;

  const addInput = () => {
    if (inputItems.length < maxInputs) {
      setInputItems([...inputItems, { image: undefined, text: "" }]);
    }
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

  const handleImageDelete = (index: number) => {
    const newInputItems = [...inputItems];
    newInputItems[index].image = undefined;
    newInputItems[index].imageFile = undefined;
    setInputItems(newInputItems);
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {inputItems.map((inputItem, index) => (
          <section key={index}>
            <section>
              <div className="bg-gray-100 h-32 shadow-md flex justify-center items-center mb-3 relative">
                {inputItem.image ? (
                  <>
                    <Image
                      src={inputItem.image}
                      alt=""
                      className="object-cover"
                      fill
                    />
                    <button
                      type="button"
                      title="画像"
                      className="rounded-full shadow-lg absolute top-0 right-0 bg-gray-400 m-2"
                      onClick={() => handleImageDelete(index)}
                    >
                      <BiPlus className="rotate-45 text-2xl text-white" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <TbCameraPlus className="text-gray-400 text-3xl" />
                    <p className="text-gray-400 pt-1 text-xs">
                      手順の写真を追加
                    </p>
                    <input
                      {...register(`descript.${index}.image`)}
                      title="画像"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload(index)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
              {/* zodのエラー文 */}
              <div className="text-red-500">
                {errors.descript?.[index]?.image?.message}
              </div>
            </section>

            <section>
              <div className="flex items-start bg-white border border-orange-200 rounded-md p-1 focus-within:outline focus-within:outline-2 focus-within:outline-orange-600">
                <p className="flex-shrink-0 bg-orange-400 text-white size-4 flex items-center justify-center font-semibold text-xs rounded-full ">
                  {index + 1}
                </p>
                <textarea
                  {...register(`descript.${index}.text`)}
                  className="h-16 w-full text-xs bg-white outline-none resize-none ml-1"
                  placeholder="フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。"
                  autoCapitalize="off"
                  autoCorrect="off"
                  // onChange={(e) => handleInputChange(index, e.target.value)} // 入力変更ハンドラー
                />
              </div>
              {/* zodのエラー文 */}
              <div className="text-red-500">
                {errors.descript?.[index]?.text?.message}
              </div>
            </section>
          </section>
        ))}
      </div>

      <button
        type="button"
        onClick={addInput}
        disabled={inputItems.length >= maxInputs}
        className="flex items-center mx-auto my-5 px-10 py-1 rounded-sm text-orange-400 border border-dashed border-orange-400"
      >
        <BiPlus className="text-lg" />
        <p className="text-sm">作り方を追加</p>
      </button>
    </>
  );
};
export default DescriptInputItem;
