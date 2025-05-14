import { Ingredient } from "@/app/types";

const IngredientItem = ({ name, amount }: Ingredient) => {
  return (
    <li className="flex items-center justify-between px-4 py-3 border-b border-[#C3B6B6] bg-[#FEF9EC]">
      <p>{name}</p>
      <p>{amount}</p>
    </li>
  );
};

export default IngredientItem;
