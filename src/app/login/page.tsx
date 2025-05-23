// import { supabase } from "../utils/supabase";
"use client";
import { useState } from "react";
import {
  addProfile,
  isLoggedIn,
  logout,
  signInWithGoogle,
} from "../utils/supabaseLogin";

const Login = () => {
  const [isLogin, setLogin] = useState<boolean>(true);
  return (
    <div className="text-black">
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <div>
        <button
          onClick={() => {
            isLoggedIn().then((res) => {
              setLogin(res);
              console.log("isLogin", res);
            });
          }}
        >
          ログイン状態を確認
        </button>
        <div>{isLogin ? "ログイン中" : "ログインしていません"}</div>
      </div>
      <div>
        <button onClick={addProfile}>プロファイルを登録</button>
      </div>
      <div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
};
export default Login;
