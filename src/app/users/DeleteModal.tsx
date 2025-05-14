import React from "react";
import { deleteRecipeDatas } from "../utils/supabaseFunctionsNew";
import { useRouter } from "next/navigation";

const DeleteModal = ({
  modalClose,
  id,
}: {
  modalClose: () => void;
  id: number;
}) => {
  const router = useRouter();
  // 背景押したら閉じるやつ
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  const deleter = async () => {
    await deleteRecipeDatas(id);
    router.refresh(); // リストからstateを受け取って更新の方がいいかも？
  };

  return (
    <>
      <div className="bg-black text-black bg-opacity-50 fixed inset-x-0 top-0 bottom-0 z-50">
        <div
          onClick={bgClickClose}
          className="flex justify-center items-center h-full"
        >
          <div className="bg-white shadow-lg rounded-3xl mx-4 w-full max-w-xs sm:max-w-md md:max-w-lg">
            <div className="text-center mt-6 text-xl font-bold">
              レシピを削除しますか？
            </div>
            <div className="text-center mt-3 text-sm">
              この操作は元に戻せません
            </div>
            <div className="flex mt-5 mb-0 w-full justify-between border-t border-gray-400">
              <button onClick={modalClose} className="w-full rounded-bl-3xl">
                <div className="py-3">キャンセル</div>
              </button>
              <div className="border-l border-gray-400 mr-0 ml-0"></div>
              <button onClick={deleter} className="w-full rounded-br-3xl">
                <div className="py-3 text-red-500">削除する</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
