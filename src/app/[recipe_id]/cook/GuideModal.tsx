import React from "react";
import { IoMdClose } from "react-icons/io";

const IngModal = ({ modalClose }: { modalClose: () => void }) => {
  // 背景押したら閉じるやつ
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 top-0 bg-black bg-opacity-50">
        <div
          onClick={bgClickClose}
          className="flex h-full items-center justify-center"
        >
          <div className="mx-5 w-full max-w-sm rounded-2xl bg-white p-3 text-black shadow-lg sm:max-w-md md:max-w-lg">
            <div className="flex w-full justify-end">
              <IoMdClose
                onClick={modalClose}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
            <div className="mb-2 border-b border-orange-400 text-center text-lg font-bold">
              音声認識ガイド
            </div>
            <div className="text-sm">
              <div className="font-bold text-orange-400">「進んで」</div>
              <div className="mb-3 ml-4">1ページ進みます。</div>
              <div className="font-bold text-orange-400">「戻って」</div>
              <div className="mb-3 ml-4">1ページ戻ります。</div>
              <div className="font-bold text-orange-400">「材料は?」</div>
              <div className="mb-3 ml-4">材料を表示します。</div>
              <div className="font-bold text-orange-400">
                「~ってどうするの?」
              </div>
              <div className="mb-3 ml-4">
                切り方の動画を再生します。
                <div className="text-xs text-gray-500">
                  {"（例）「いちょう切りってどうするの？」"}
                </div>
              </div>
              <div className="font-bold text-orange-400">
                「タイマーxxセット」
              </div>
              <div className="mb-3 ml-4">
                タイマーをxxの時間セットして、表示します。
                <div className="text-xs text-gray-500">
                  {"（例）「タイマー3分セット」"}
                </div>
              </div>
              <div className="text-lg font-bold text-orange-400">
                「閉じて」
              </div>
              <div className="ml-4">表示を閉じます。</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngModal;
