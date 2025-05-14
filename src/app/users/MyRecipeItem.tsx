"use client";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

const ModalContainer = ({ children }: { children: React.JSX.Element }) => {
  const container = document.getElementById("container");
  if (!container) {
    return null;
  }
  return createPortal(children, container);
};

const MyRecipeItem = ({
  id,
  name,
  image_url,
}: {
  id: number;
  name: string;
  image_url?: string;
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <section className="flex justify-between px-2 py-3 border-b-2">
      <div className="flex items-start gap-3 w-full">
        <div className="relative w-20 md:w-32 aspect-[5/4] shrink-0">
          <Image
            // undefinedの場合はアプリロゴを表示する（仮）
            src={image_url != undefined ? image_url : "/apple-touch-icon.png"}
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow h-full">
          <p className="font-semibold mt-auto text-base break-words">{name}</p>
          <div className="flex gap-4 text-xs self-end pt-1 md:pt-3">
            <Link
              href={`/users/edit/${id}`}
              className="bg-white text-orange-400 border-orange-400 border-2 px-4 py-1 rounded-3xl"
            >
              編集
            </Link>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="bg-orange-400 text-white px-4 py-1 rounded-3xl"
            >
              削除
            </button>
          </div>
        </div>
      </div>
      <div id="container">
        {deleteModalOpen && (
          <ModalContainer>
            <DeleteModal
              modalClose={() => {
                setDeleteModalOpen(false);
              }}
              id={id}
            />
          </ModalContainer>
        )}
      </div>
    </section>
  );
};

export default MyRecipeItem;
