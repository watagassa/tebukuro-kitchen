"use client";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  addProfile,
  isLoggedIn,
  logout,
  signInWithGoogle,
} from "../utils/supabaseLogin";

const Login = () => {
  const [isLogin, setLogin] = useState<boolean>(false);

  useEffect(() => {
    isLoggedIn().then((res) => {
      setLogin(res);
      console.log("isLogin", res);
    });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="relative bg-white h-96 p-6 text-center shadow-lg w-80 rounded-md">
        {/* イラスト画像 */}
        <div className="w-[240px] h-[230px] relative -mt-10 mx-auto">
          <Image
            src="/icon.png"
            alt="アイコン"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* 閉じるボタン */}
        <Link
          href="/"
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <AiOutlineClose size={24} />
        </Link>

        {/* サブタイトル */}
        <p className="text-black text-md font-bold mb-2">
          この機能はログインが必要です
        </p>

        {/* Googleログインボタン */}
        <button
          onClick={signInWithGoogle}
          className="
            mt-4
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
          <FcGoogle className="w-6 h-6" />
          <span>Googleでログイン</span>
        </button>

        {/* キャンセルボタン */}
        <Link
          href="/"
          className="bg-gray-300 w-20 py-2 text-sm text-black hover:bg-gray-400 font-bold mt-6"
        >
          キャンセル
        </Link>
        {/* ログイン状態表示 */}
        <div>{isLogin ? "ログイン中" : "ログインしていません"}</div>
        {/* オプションボタンたち */}
        <button onClick={addProfile}>プロファイル登録</button>
        <button onClick={logout}>ログアウト</button>
      </div>
    </div>
  );
};

export default Login;
