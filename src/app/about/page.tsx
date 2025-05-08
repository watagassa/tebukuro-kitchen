import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const About = () => {
  return (
    <div
      className="min-h-screen overflow-hidden flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#FFF9F0" }}
    >
      {/* イラスト画像 */}
      <div className="w-[480px] h-[480px] relative -mt-10">
        <div
          className="absolute top-1/2 left-1/2 rounded-full opacity-50"
          style={{
            width: "85%",
            height: "85%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFE5B7",
            boxShadow: "0 0 50px rgba(255, 229, 183, 10)",
          }}
        ></div>
        <Image
          src="/cooking.png"
          alt="料理中のイラスト"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* 見出し */}
      <h1 className="text-orange-500 text-[38.2px] font-bold text-center mb-3 pb-6 leading-relaxed translate-y-[-10px]">
        声で操作、手は自由！
        <br />
        新しい料理体験を
      </h1>

      {/*　説明文　*/}
      <div className="flex flex-col items-start max-w-md w-full">
        <p className="text-black text-md mt-1 leading-relaxed">
          手が塞がっていても大丈夫。
        </p>
        <p className="text-black text-md mt-1 leading-relaxed">
          「進んで」「材料は？」「タイマーXXセット」など、
        </p>
        <p className="text-black text-md mt-1 leading-relaxed">
          声だけで料理画面を操作できます。
        </p>
      </div>

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
    flex
    items-center
    justify-center
    gap-2
    "
      >
        <FcGoogle className="w-8 h-8 translate-x-[-20px]" />
        <span className="translate-x-[-10px]">Googleでログイン</span>
      </button>

      {/* ログインせずに始めるボタン */}
      <div className="text-md text-gray-500 mt-6 font-bold">
        ―{" "}
        <span className="cursor-pointer hover:text-gray-700">
          ログインせずに始める
        </span>{" "}
        ―
      </div>
    </div>
  );
};

export default About;
