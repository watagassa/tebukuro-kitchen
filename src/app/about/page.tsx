import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const About = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: "#FFF9F0" }}
    >
      {/* イラスト画像 */}
      <div className="relative -mt-10 h-[480px] w-[480px]">
        <div
          className="absolute left-1/2 top-1/2 rounded-full opacity-50"
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
      <h1 className="mb-3 translate-y-[-10px] pb-6 text-center text-[38.2px] font-bold leading-relaxed text-orange-500">
        声で操作、手は自由！
        <br />
        新しい料理体験を
      </h1>

      {/*説明文*/}
      <div className="flex w-full max-w-md flex-col items-start">
        <p className="text-md mt-1 leading-relaxed text-black">
          手が塞がっていても大丈夫。
        </p>
        <p className="text-md mt-1 leading-relaxed text-black">
          「進んで」「材料は？」「タイマーXXセット」など、
        </p>
        <p className="text-md mt-1 leading-relaxed text-black">
          声だけで料理画面を操作できます。
        </p>
      </div>

      {/* Googleログインボタン */}
      <button
        type="submit"
        className="mt-12 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-solid border-black border-opacity-25 bg-white text-base transition duration-300 hover:border-opacity-50 hover:bg-gray-200"
      >
        <FcGoogle className="h-8 w-8 translate-x-[-20px]" />
        <span className="translate-x-[-10px]">Googleでログイン</span>
      </button>

      {/* ログインせずに始めるボタン */}
      <div className="text-md mt-6 font-bold text-gray-500">
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
