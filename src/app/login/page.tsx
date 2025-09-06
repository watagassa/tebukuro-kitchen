"use client";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { signInWithGoogle } from "../utils/supabaseLogin";
// import { useEffect, useState } from "react";
// import {
//   addProfile,
//   isLoggedIn,
//   logout,
//   signInWithGoogle,
// } from "../utils/supabaseLogin";

const Login = ({
  searchParams,
}: {
  params: string;
  searchParams: { cancelRedirect?: boolean; callbackUrl: string };
}) => {
  // const [isLogin, setLogin] = useState<boolean>(false);
  const callbackUrl = searchParams.callbackUrl;
  const cancelRedirect = searchParams.cancelRedirect;

  // useEffect(() => {
  //   isLoggedIn().then((res) => {
  //     setLogin(res);
  //     console.log("isLogin", res);
  //   });
  // }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative h-[377px] w-80 rounded-md bg-white p-6 text-center shadow-lg">
        {/* イラスト画像 */}
        <div className="absolute left-1/2 top-3 h-[230px] w-[240px] -translate-x-1/2">
          <Image
            src="/icon.png"
            alt="アイコン"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* 閉じるボタン */}
        <Link
          href={cancelRedirect ? callbackUrl : "/"}
          className="absolute right-3 top-3 text-gray-600 hover:text-black"
        >
          <AiOutlineClose size={24} />
        </Link>

        {/* サブタイトル */}
        <p className="text-md mb-2 mt-48 text-gray-700">
          この機能はログインが必要です
        </p>

        {/* Googleログインボタン */}
        <button
          onClick={signInWithGoogle}
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-solid border-black bg-white text-base transition duration-300 hover:border-opacity-50 hover:bg-gray-200"
        >
          <FcGoogle className="h-6 w-6" />
          <span>Googleでログイン</span>
        </button>

        {/* キャンセルボタン */}
        <Link
          href={cancelRedirect ? callbackUrl : "/"}
          className="mt-6 inline-block w-20 translate-x-[108px] transform rounded-sm bg-gray-300 px-1 py-2 text-sm font-bold text-black hover:bg-gray-400"
        >
          キャンセル
        </Link>
        {/* ログイン状態表示*/}
        {/* <div>{isLogin ? "ログイン中" : "ログインしていません"}</div> */}
        {/* オプションボタンたち */}
        {/* <button onClick={addProfile}>プロファイル登録</button>
        <button onClick={logout}>ログアウト</button> */}
      </div>
    </div>
  );
};

export default Login;
