import React from "react";
import { logout } from "../utils/supabaseLogin";
import { useRouter } from "next/navigation";

const LogoutModal = ({ modalClose }: { modalClose: () => void }) => {
  const router = useRouter();
  // 背景押したら閉じるやつ
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  const logouter = async () => {
    await logout();
    // FIXME replaceだけだとログアウト後にキャッシュが残ってゲストページに飛べるようになる
    //       refreshを追加すると改善したけど、サーバー側に余計な負荷がかかるし他の方法にした方がいい気がする
    router.replace("/");
    router.refresh(); // リストからstateを受け取って更新の方がいいかも？
  };

  return (
    <div
      onClick={bgClickClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div className="w-80 rounded-2xl bg-white px-0 pt-6 text-center shadow-lg">
        {" "}
        <div className="px-6">
          {" "}
          <h2
            className="mb-2 text-xl font-bold"
            style={{ transform: "translateY(5px)" }}
          >
            ログアウトしますか?
          </h2>
          <p
            className="mb-8 text-sm text-gray-600"
            style={{ transform: "translateY(15px)" }}
          >
            このページに戻るには
            <br />
            再度ログインが必要になります。
          </p>
        </div>
        <hr className="w-full border-t border-gray-200" />
        <div className="flex divide-x">
          <button
            onClick={modalClose}
            className="w-1/2 rounded-bl-2xl py-4 font-bold text-black hover:bg-gray-100"
          >
            キャンセル
          </button>
          <button
            onClick={logouter}
            className="w-1/2 rounded-br-2xl py-4 font-bold text-orange-500 hover:bg-orange-50"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
