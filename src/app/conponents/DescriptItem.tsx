import { Descript } from "@/app/types";
import Image from "next/image";
import { FiCameraOff } from "react-icons/fi";

const DescriptItem = (props: Descript) => {
  const { id, text, image_url } = props;

  return (
    <div className="bg-white flex items-start justify-between p-1">
      <div className="flex-shrink-0">
        <p className="bg-orange-400 text-white size-4 flex items-center justify-center font-semibold text-xs rounded-sm">
          {id}
        </p>
      </div>
      <p className="pt-2 px-4 font-semibold text-xs break-words max-w-[calc(100%-90px)]">
        {text}
      </p>
      {/* nullのみを判定しているので、url先の画像が見つからない場合に対処できない */}

      {image_url ? (
        <div className="relative size-[72px]">
          <Image
            src={image_url}
            alt={text || ""}
            fill={true}
            className="my-auto object-cover"
            onError={() => console.error("Image failed to load")}
          />
        </div>
      ) : (
        <div className="bg-gray-100 p-6">
          <FiCameraOff size={24} stroke="#737373" />
        </div>
      )}
    </div>
  );
};

export default DescriptItem;
