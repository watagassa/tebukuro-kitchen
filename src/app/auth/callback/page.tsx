"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabase";
import { addProfile } from "@/app/utils/supabaseLogin";
import Loading from "@/app/loading";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

        const callbackUrl = searchParams.get("callbackUrl") || "/";
        console.log("Redirecting to:", callbackUrl);
        router.replace(callbackUrl);
      }
    };

    processSession();
  }, []);

  return <Loading />;
}
