import { Recipe } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { FiCameraOff } from "react-icons/fi";

type ArticleCardProps = {
  recipe: Recipe;
  from?: string;
};

const ArticleCard = (props: ArticleCardProps) => {
  const { recipe, from } = props;
  // const existImage: boolean = false;
  // if (recipe != null) {
  return (
    <Link
      href={`/${recipe.id}${from ? `?from=${from}` : ""}`}
      className="border-[1px] border-gray-400 rounded-lg bg-white"
    >
      <div className="relative rounded-t-[7px] overflow-hidden aspect-[7/10] flex justify-center items-center bg-gray-100">
        {recipe.image_url ? (
          <Image
            // src={`https://picsum.photos/${recipe.id + 500}`}
            src={recipe.image_url}
            alt={recipe.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="rounded-t-[7px] object-cover"
            onError={() => console.error("Image failed to load")}
          />
        ) : (
          <FiCameraOff size={30} stroke="#737373" />
        )}
      </div>

      <p className="min-h-12 border-t-4 border-t-orange-400 rounded-b-lg font-semibold text-sm p-1 text-black">
        {recipe.name}
      </p>
    </Link>
  );
  // }
};

export default ArticleCard;
