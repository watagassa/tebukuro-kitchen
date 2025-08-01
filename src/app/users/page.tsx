import Footer from "@/app/conponents/Footer";
import UserProfile from "./UserProfile";
import UserRecipeList from "./UserRecipeList";
import UserLogoutButton from "./UserLogoutButton";

const UserId = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF4] text-black">
      <header className="sticky flex w-full items-center justify-center border-b border-gray-400 bg-orange-400 p-6 shadow-md">
        <p className="text-balance pl-10 pr-4 text-center text-xl font-semibold text-white">
          マイページ
        </p>
      </header>
      <section className="flex justify-between bg-white p-3">
        <UserProfile />
        <UserLogoutButton />
      </section>
      <p className="mb-4 mt-8 pl-2 text-xl font-semibold">マイレシピ一覧</p>
      <UserRecipeList />
      <div className="mt-auto">
        <Footer pathName="/users" />
      </div>
    </div>
  );
};

export default UserId;
