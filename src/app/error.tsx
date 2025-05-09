"use client";
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className=" border-gray-800 text-gray-800 p-4 mt-4 rounded max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-2">エラーが発生しました</h3>
      <button
        //   再読み込み
        onClick={() => reset()}
        className="bg-black text-white mt-2 px-4 py-2 rounded hover:bg-orange-500 transition ease-in-out duration-200"
      >
        再読み込み
      </button>
    </div>
  );
};

export default Error;
