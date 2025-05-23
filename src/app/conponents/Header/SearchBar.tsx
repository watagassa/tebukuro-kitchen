import { kWContext } from '@/app/home/HomeForm';
import React, { useContext, useState } from 'react'
import { FiSearch } from 'react-icons/fi';


const SearchBar = () => {
  const setSearchKW = useContext(kWContext).setSearchKW;
  const [input, setInput] = useState<string>('');

  const SeachRecipe = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    setSearchKW(input);
  };

  return (
    <div className=" px-2 w-full flex items-center bg-gray-200 rounded-[17px] border-[1px] border-black" >
      <FiSearch size={27} color="gray" className="ms-3 h-12" />
      <input
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={(e) => { SeachRecipe(e) }}
        placeholder="レシピを検索"
        className="ps-2 pe-6 w-full text-lg border-spacing-4 bg-gray-200 border-gray-50 focus:outline-none"
      />
      {input !== "" &&
        <button className="mr-4 ml-3 right-10 text-black"
          onClick={() => {
            setInput('');
            setSearchKW('');
          }}>
          ✕
        </button>}
    </div >
  )
}

export default SearchBar