import Footer from "@/app/conponents/Footer";
import UserProfile from "../../UserProfile";
import UserRecipeList from "../../UserRecipeList";

const UserId = ({ params }: { params: { user_id: number } }) => {
  return (
    <div className="bg-[#FFFBF4] min-h-screen flex flex-col">
      <header className="bg-orange-400 sticky w-full flex items-center justify-center p-6 border-b border-gray-400 shadow-md">
        <p className="text-center text-xl font-semibold pl-10 pr-4 text-balance text-white">
          マイページ
        </p>
      </header>
      <section className="flex p-3 bg-white justify-between">
        <UserProfile user_id={params.user_id} />
      </section>
      <p className="font-semibold text-xl mt-8 mb-4 pl-2">レシピ一覧</p>
      <section className="bg-white rounded-xl mx-2">
        <UserRecipeList user_id={params.user_id} />
      </section>
      <div className="mt-auto">
        <Footer pathName="/" />
      </div>
    </div>
  );
};

export default UserId;
