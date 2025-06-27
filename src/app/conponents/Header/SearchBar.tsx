import { kWContext } from "@/app/home/HomeForm";
import React, { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const setSearchKW = useContext(kWContext).setSearchKW;
  const [input, setInput] = useState<string>("");

  const SeachRecipe = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    setSearchKW(input);
  };

  return (
    <div className="flex w-full items-center rounded-[17px] border-[1px] border-black bg-gray-200 px-2">
      <FiSearch size={27} color="gray" className="ms-3 h-12" />
      <input
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={(e) => {
          SeachRecipe(e);
        }}
        placeholder="レシピを検索"
        className="w-full border-spacing-4 border-gray-50 bg-gray-200 pe-6 ps-2 text-lg focus:outline-none"
      />
      {input !== "" && (
        <button
          className="right-10 ml-3 mr-4 text-black"
          onClick={() => {
            setInput("");
            setSearchKW("");
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
