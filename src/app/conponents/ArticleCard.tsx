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
    <Link href={`/${recipe.id}${from ? `?from=${from}` : ""}`}>
      <div className="relative flex aspect-[12/9] items-center justify-center overflow-hidden rounded-t-xl border-l border-r border-t border-orange-200 bg-gray-100">
        {recipe.image_url ? (
          <Image
            src={recipe.image_url}
            alt={recipe.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="rounded-t-lg object-cover"
            onError={() => console.error("Image failed to load")}
          />
        ) : (
          <FiCameraOff size={30} stroke="#737373" />
        )}
      </div>

      <p className="flex min-h-11 items-center rounded-b-xl border-b border-l border-r border-orange-200 bg-white pl-2 text-left text-sm font-semibold text-orange-700">
        {recipe.name}
      </p>
    </Link>
  );
};

export default ArticleCard;
