import Image from "next/image";

const MyResipeItem = () => {
  return (
    <section className="flex justify-between px-2 py-3 border-b-2">
      <div className="flex items-start gap-3 w-full">
        <div className="relative w-20 md:w-32 aspect-[5/4] shrink-0">
          <Image
            src="/thumbnail.png"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow h-full">
          <p className="font-semibold mt-auto text-sm break-words">
            基本チャーハン
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyResipeItem;
