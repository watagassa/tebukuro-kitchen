"use client";
import Image from "next/image";

import {
  FieldErrors,
  UseFormRegister,
  UseFieldArrayReturn,
} from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { TbCameraPlus } from "react-icons/tb";
import { BiTrash } from "react-icons/bi";

import { RecipeSchemaType } from "@/app/validations/schema";

interface DescriptInputItemProps {
  errors: FieldErrors<RecipeSchemaType>;
  register: UseFormRegister<RecipeSchemaType>;
  fieldArray: UseFieldArrayReturn<RecipeSchemaType, "descript", "id">;
}

const DescriptInputItem = ({
  errors,
  register,
  fieldArray,
}: DescriptInputItemProps) => {
  const maxInputs = 6;
  const { fields, append, remove, update } = fieldArray;

  const addInput = () => {
    if (fields.length < maxInputs) {
      append({ text: "", imageString: "", imageFile: undefined });
    }
  };

  const handleImageUpload =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        update(index, {
          ...fields[index],
          imageString: reader.result as string,
          imageFile: file,
        });
      };
      reader.readAsDataURL(file);
    };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {fields.map((field, index) => (
          <section key={field.id}>
            <section className="relative">
              <div className="bg-gray-100 h-32 shadow-md flex justify-center items-center mb-3 relative">
                {field.imageString ? (
                  <>
                    <Image
                      src={field.imageString}
                      alt=""
                      className="object-cover"
                      fill
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <TbCameraPlus className="text-gray-400 text-3xl" />
                    <p className="text-gray-400 pt-1 text-xs">
                      手順の写真を追加
                    </p>
                  </div>
                )}
                <input
                  {...register(`descript.${index}.imageFile`)}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload(index)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 absolute top-0 right-0 rounded-full shadow p-1 m-1 bg-orange-primary"
                  >
                    <BiTrash className="text-xl" />
                  </button>
                )}
              </div>
              {/* zodのエラー文 */}
              <div className="text-red-500 text-sm">
                {errors.descript?.[index]?.imageFile?.message}
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
                  inputMode="text"
                  autoCorrect="off"
                />
              </div>

              {/* zodのエラー文 */}
              <div className="text-red-500 text-sm">
                {errors.descript?.[index]?.text?.message}
              </div>
            </section>
          </section>
        ))}
      </div>

      {fields.length < maxInputs && (
        <button
          type="button"
          onClick={addInput}
          disabled={fields.length >= maxInputs}
          className="flex items-center mx-auto my-5 px-10 py-1 rounded-sm text-orange-400 border border-dashed border-orange-400"
        >
          <BiPlus className="text-lg" />
          <p className="text-sm">作り方を追加</p>
        </button>
      )}
    </>
  );
};
export default DescriptInputItem;
