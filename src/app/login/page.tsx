// import { supabase } from "../utils/supabase";
"use client";
import { useState } from "react";
import {
  insertProfileIfNeeded,
  isLoggedIn,
  logout,
  signInWithGoogle,
} from "../utils/supabaseLogin";

const Login = () => {
  const [isLogin, setLogin] = useState<boolean>(true);
  return (
    <div className="text-black">
      <h1>Welcome to My App</h1>
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
          checkUserLoggedIn
        </button>
        <div>{isLogin ? "ログイン中" : "ログインしていません"}</div>
      </div>
      <div>
        <button onClick={insertProfileIfNeeded}>insertProfileIfNeeded</button>
      </div>

      <div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
};
export default Login;
