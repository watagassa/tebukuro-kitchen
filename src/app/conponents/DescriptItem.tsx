import Image from "next/image";
import { FiCameraOff } from "react-icons/fi";
import { Descript } from "@/app/types";

const DescriptItem = ({ id, text, image_url }: Descript) => {
  return (
    <div className="bg-white flex items-start justify-between p-2 border-orange-200 border rounded-xl">
      <div className="flex">
        <p className="flex-shrink-0 bg-orange-400 text-white size-5 flex items-center justify-center font-semibold text-xs rounded-full">
          {id}
        </p>

        <p className="px-2 text-sm break-words flex-grow">{text}</p>
      </div>
      {/* nullのみを判定しているので、url先の画像が見つからない場合に対処できない */}
      {image_url ? (
        <div className="relative size-[72px] ">
          <Image
            src={image_url}
            alt={text || ""}
            fill={true}
            className="my-auto object-cover rounded-xl"
            onError={() => console.error("Image failed to load")}
          />
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-xl">
          <FiCameraOff size={24} stroke="#737373" />
        </div>
      )}
    </div>
  );
};

export default DescriptItem;
