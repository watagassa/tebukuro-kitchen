"use client";
import { inputDescript } from "@/app/types";
import Image from "next/image";
import { BiCameraOff, BiPlus } from "react-icons/bi";
interface DescriptInputItem {
  inputItems: inputDescript[];
  setInputItems: React.Dispatch<React.SetStateAction<inputDescript[]>>;
}
const DescriptInputItem = ({
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

  const handleInputChange = (index: number, value: string) => {
    const newInputItems = [...inputItems];
    newInputItems[index].text = value; // 入力内容を更新
    setInputItems(newInputItems);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">
        {inputItems.map((inputItem, index) => (
          <div key={index}>
            <div className="bg-gray-100 h-32 shadow-md flex justify-center items-center mb-3 relative">
              {inputItem.image ? (
                <>
                  <Image
                    src={inputItem.image}
                    alt=""
                    className="object-cover"
                    fill
                  />
                  <input
                    title="画像"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload(index)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <button
                    title="画像"
                    className="size-5 rounded-full shadow-lg absolute top-0 right-0 bg-gray-400 m-2 flex justify-center items-center"
                  >
                    <BiPlus className="rotate-45 text-2xl text-white" />
                  </button>
                </>
              ) : (
                <input
                  title="画像"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload(index)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
              {!inputItem.image && (
                <BiCameraOff className="text-gray-400 text-2xl" />
              )}
            </div>

            <div className="flex bg-white">
              <p className="flex-shrink-0 bg-orange-400 text-white size-4 flex items-center justify-center font-semibold text-xs rounded-sm m-1">
                {index + 1} {/* 番号表示 */}
              </p>
              <textarea
                className="h-16 w-full pt-1 text-[10px] resize-none"
                placeholder="フライパンに油をひき、卵を割る。白身が白くなったらお米を入れる。"
                value={inputItem.text}
                style={{ outline: "none" }}
                onChange={(e) => handleInputChange(index, e.target.value)} // 入力変更ハンドラー
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={addInput}
        disabled={inputItems.length >= maxInputs}
        className="flex mx-auto my-4 text-orange-400"
      >
        <BiPlus className="text-2xl" />
        <p>項目を増やす</p>
      </button>
    </>
  );
};
export default DescriptInputItem;
