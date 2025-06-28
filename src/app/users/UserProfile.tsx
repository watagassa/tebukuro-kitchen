"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { frontProfile } from "../types";
import { getMyProfile, getProfileByID } from "../utils/supabaseLogin";

type UserProfileProps = {
  user_id?: number;
};

const UserProfile = ({ user_id }: UserProfileProps) => {
  const [profile, setProfile] = useState<frontProfile>({
    name: "テストユーザー",
    avatar_url: "/thumbnail.png",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user_id) {
        const fetchData = await getMyProfile();
        if (!fetchData) return;
        setProfile(fetchData);
      } else {
        const fetchData = await getProfileByID(user_id);
        if (!fetchData) return;
        setProfile(fetchData);
      }
    };
    console.log("マイプロフィール取得" + profile.name, profile.avatar_url);
    fetchProfile();
  }, [profile.avatar_url, profile.name, user_id]);
  return (
    <div className="flex gap-x-3">
      <div className="relative size-16 shrink-0">
        <Image
          src={profile.avatar_url}
          alt="avatar_image"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="my-auto font-semibold">
        <p className="pb-1 text-xl text-black">{profile.name}</p>
        {/* <p className="text-xs text-[#797575]">@1124awerq</p> */}
      </div>
    </div>
  );
};

export default UserProfile;
