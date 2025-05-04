import Image from "next/image";

const MyRecipeItem = () => {
  return (
    <section className="flex justify-between px-2 py-3 border-b-2">
      <div className="flex items-start gap-3 w-full">
        <div className="relative w-20 md:w-32 aspect-[5/4] shrink-0">
          <Image
            src="/image/thumbnail.png"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow h-full">
          <p className="font-semibold mt-auto text-base break-words">
            基本チャーハン
          </p>
          <div className="flex gap-4 text-xs self-end pt-1 md:pt-3">
            <button className="bg-white text-orange-400 border-orange-400 border-2 px-4 py-1 rounded-3xl">
              編集
            </button>
            <button className="bg-orange-400 text-white px-4 py-1 rounded-3xl">
              削除
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyRecipeItem;
