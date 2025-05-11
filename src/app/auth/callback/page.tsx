"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";
import { addProfile } from "@/app/utils/supabaseLogin";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const processSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session fetch error:", error);
      } else if (session) {
        addProfile();
        console.log("Session fetched:", session);
        router.replace("/"); // ログイン後の遷移先
      }
    };

    processSession();
  }, []);

  return <p>ログイン処理中...</p>;
}
