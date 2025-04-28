import Footer from "@/app/conponents/Footer";
import { FiUser } from "react-icons/fi";

const UserId = () => {
  return (
    <div className="bg-[#FFFBF4] min-h-screen flex flex-col">
      <header
        className={`bg-white sticky w-full flex items-center justify-center p-6 border-b border-gray-400 shadow-md `}
      >
        <p
          className={`text-center text-xl font-semibold pl-10 pr-4 text-balance text-black`}
        >
          マイページ
        </p>
      </header>
      <section className="flex gap-x-3 p-3 flex-grow">
        <div className="rounded-full bg-purple-500 size-10 flex items-center justify-center">
          <FiUser size={24} stroke="#fff" />
        </div>
        <div className="text-[#797575] font-semibold">
          <p className="pb-1">ゲストユーザー</p>
          <p className="text-xs">@1124awerq</p>
        </div>
      </section>
      <Footer pathName="/mypage" />
    </div>
  );
};

export default UserId;
