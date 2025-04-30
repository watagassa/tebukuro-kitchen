import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
const LoginModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="relative bg-white h-96 p-6 text-center shadow-lg">
        {/* イラスト画像 */}
        <div className="w-[240px] h-[230px] relative -mt-10">
          <Image
            src="/icon.png"
            alt="アイコン"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <button className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <AiOutlineClose size={24} />
        </button>

        {/* 閉じるボタン */}
        <button className="absolute top-4 right-4 text-black"></button>

        {/* サブタイトル */}
        <p className="text-black text-md font-bold mb-2">
          この機能はログインが必要です
        </p>

        {/* Googleログインボタン */}
        <button
          type="submit"
          className="
    mt-12
    w-full
    h-12
    text-base
    hover:bg-gray-200
    bg-white
    border-2 border-solid border-black border-opacity-25
    hover:border-opacity-50
    rounded-md
    cursor-pointer
    transition
    duration-300
    translate-y-[-20px]
    flex
    items-center
    justify-center
    gap-2
    "
        >
          <FcGoogle className="w-8 h-8 translate-x-[-20px]" />
          <span className="translate-x-[-10px]">Googleでログイン</span>
        </button>

        {/* キャンセルボタン */}
        <button className="bg-gray-300 w-20 py-2 text-sm text-black hover:bg-gray-400 font-bold translate-x-24 translate-y-1">
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
