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
  return (
    <Link
      href={`/${recipe.id}${from ? `?from=${from}` : ""}`}
      className="rounded-[32px] border-[0.1px] border-gray-400 bg-white"
    >
      <div className="relative flex aspect-[6/5] items-center justify-center overflow-hidden rounded-t-[32px] bg-gray-100">
        {recipe.image_url ? (
          <Image
            src={recipe.image_url}
            alt={recipe.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="rounded-t-[32px] object-cover"
            onError={() => console.error("Image failed to load")}
          />
        ) : (
          <FiCameraOff size={30} stroke="#737373" />
        )}
      </div>

      <p className="flex min-h-11 justify-center rounded-b-lg pt-2 text-sm font-semibold text-black">
        {recipe.name}
      </p>
    </Link>
  );
};

export default ArticleCard;
