import Footer from "@/app/conponents/Footer";
import OthersResipeItem from "@/app/users/OthersResipeItem";
import Image from "next/image";

const UserId = () => {
  return (
    <div className="bg-[#FFFBF4] min-h-screen flex flex-col">
      <header className="bg-orange-400 sticky w-full flex items-center justify-center p-6 border-b border-gray-400 shadow-md">
        <p className="text-center text-xl font-semibold pl-10 pr-4 text-balance text-white">
          マイページ
        </p>
      </header>
      <section className="flex p-3 bg-white justify-between">
        <div className="flex gap-x-3">
          <div className="relative size-16 shrink-0">
            <Image
              src="/thumbnail.png"
              alt=""
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="font-semibold my-auto">
            <p className="pb-1 text-xl text-black">ゲストユーザー</p>
            <p className="text-xs text-[#797575]">@1124awerq</p>
          </div>
        </div>
      </section>
      <p className="font-semibold text-xl mt-8 mb-4 pl-2">レシピ一覧</p>
      <section className="bg-white rounded-xl mx-2">
        <OthersResipeItem />
        <p className="flex justify-center font-semibold p-8 text-gray-400">
          保存されたレシピは以上です
        </p>
      </section>
      <div className="mt-auto">
        <Footer pathName="/" />
      </div>
    </div>
  );
};

export default UserId;
