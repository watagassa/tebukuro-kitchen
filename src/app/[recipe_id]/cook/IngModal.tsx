import { Ingredient } from "@/app/types";
import React from "react";
import { IoMdClose } from "react-icons/io";

// ハイライトする材料の配列番号を検出する関数
const highLight = (descript: string, ingredient: Ingredient[]) => {
  const foundIndex: number[] = [];
  for (let i = 0; i < ingredient.length; i++) {
    const regex = new RegExp(ingredient[i].name);
    const match = regex.exec(descript);
    if (match !== null) {
      foundIndex.push(i);
    }
  }
  return foundIndex;
};

const IngModal = ({
  modalClose,
  ingredient,
  descript,
  howMany,
}: {
  modalClose: () => void;
  ingredient: Ingredient[];
  descript?: string;
  howMany: string;
}) => {
  // 背景押したら閉じるやつ
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  // ハイライトする配列番号の取得
  let highLightWord: number[] = [-1];
  if (descript) {
    highLightWord = highLight(descript, ingredient);
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 top-0 bg-black bg-opacity-50">
        <div
          onClick={bgClickClose}
          className="flex h-full items-center justify-center"
        >
          <div className="mx-10 w-80 rounded-xl bg-white text-gray-400 shadow-lg">
            <div className="flex w-full justify-end">
              <span className="relative left-9 top-9 text-sm text-gray-400">
                閉じて
              </span>
              <IoMdClose
                onClick={modalClose}
                className="relative right-1 top-1 m-1 mr-3 h-7 w-7"
              />
            </div>
            <div className="mx-3 mb-5 border-b-2 border-orange-600 pb-1 text-xl font-bold">
              <span className="text-orange-600">
                {howMany ? `材料（${howMany}）` : "材料"}
              </span>
            </div>
            <div className="mb-5">
              {ingredient.map((ing: Ingredient) => (
                <div
                  key={ing.index}
                  className={`my-1 flex justify-between ${
                    ing.index == ingredient.length - 1
                      ? ""
                      : "border-b-2 border-dotted border-gray-300"
                  } `}
                >
                  {highLightWord.includes(ing.index ?? -1) ? (
                    <span
                      key={ing.index}
                      className="mb-1 ml-3 font-bold text-orange-400"
                    >
                      {ing.name}
                    </span>
                  ) : (
                    <span key={ing.index} className="mb-1 ml-3 text-black">
                      {ing.name}
                    </span>
                  )}
                  <span className="mr-3 text-black">{ing.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngModal;
