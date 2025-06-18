// bad-commit.tsx

import React from "react";

const Hello = () => {
  eval("console.log('Not allowed')"); // ❌ eval はセキュリティ上禁止
  return (
    <div className="flex items-center justify-center bg-black p-4 text-center text-white shadow-lg">
      <h1>Hello</h1>
    </div>
  );
};

export default Hello;
