"use client";
import Footer from "@/app/conponents/Footer";
import UserProfile from "./UserProfile";
import UserRecipeList from "./UserRecipeList";
import UserLogoutButton from "./UserLogoutButton";
import useSWR from "swr";
import { getMyPage } from "./getPageElements";
import Loading from "../loading";

const UserId = () => {
  const { data: pageElements, error } = useSWR("/userPage", getMyPage, {
    revalidateOnFocus: false, // windowをフォーカスすると再検証しない
  });

  if (error) return <div>{error}</div>;
  if (!pageElements) return <Loading />;

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF4] text-black">
      <header className="sticky flex w-full items-center justify-center border-b border-gray-400 bg-orange-400 p-6 shadow-md">
        <p className="text-balance pl-10 pr-4 text-center text-xl font-semibold text-white">
          マイページ
        </p>
      </header>
      <section className="flex justify-between bg-white p-3">
        <UserProfile
          name={pageElements.profile.name}
          avatar={pageElements.profile.avatar_url}
        />
        <UserLogoutButton />
      </section>
      <p className="mb-4 mt-8 pl-2 text-xl font-semibold">マイレシピ一覧</p>
      <UserRecipeList
        user_id={pageElements.user_id}
        userRecipe={pageElements.created_recipes}
        pageType="self"
      />
      <div className="mt-auto">
        <Footer pathName="/users" />
      </div>
    </div>
  );
};

export default UserId;
