import React from "react";
import { deleteRecipeDatas } from "../utils/supabaseFunctionsNew";

const DeleteModal = ({
  modalClose,
  id,
}: {
  modalClose: () => void;
  id: number;
}) => {
  // 背景押したら閉じるやつ
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  const deleter = async () => {
    await deleteRecipeDatas(id);
  };

  return (
    <>
      <div className="bg-black text-black bg-opacity-50 fixed inset-x-0 top-0 bottom-0 z-50">
        <div
          onClick={bgClickClose}
          className="flex justify-center items-center h-full"
        >
          <div className="bg-white shadow-lg rounded-2xl py-4 mx-4 w-full max-w-xs sm:max-w-md md:max-w-lg">
            <div className="text-center text-xl font-bold">レシピを削除しますか？</div>
            <div className="text-center mt-2 text-sm">この操作は元に戻せません</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
