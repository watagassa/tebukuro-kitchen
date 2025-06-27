"use client";
import React, { useEffect } from "react";
// ここ大文字で
const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="mx-auto mt-4 max-w-md rounded border-gray-800 p-4 text-gray-800">
      <h3 className="mb-2 text-2xl font-bold">エラーが発生しました</h3>
      <button
        //   再読み込み
        onClick={() => reset()}
        className="mt-2 rounded bg-black px-4 py-2 text-white transition duration-200 ease-in-out hover:bg-orange-500"
      >
        再読み込み
      </button>
    </div>
  );
};

export default Error;
