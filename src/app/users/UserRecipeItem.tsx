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

const UserRecipeItem = ({
  user_id,
  id,
  name,
  image_url,
}: {
  user_id?: string;
  id: number;
  name: string;
  image_url?: string;
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <section className="flex justify-between border-b-2 px-2 py-3">
      <div className="flex w-full items-start gap-3">
        <div className="relative aspect-[5/4] w-20 shrink-0 md:w-32">
          <Image
            // undefinedの場合はアプリロゴを表示する（仮）
            src={image_url != undefined ? image_url : "/apple-touch-icon.png"}
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex h-full flex-grow flex-col justify-between">
          <p className="mt-auto break-words text-base font-semibold">{name}</p>
          {user_id && (
            <div className="flex gap-4 self-end pt-1 text-xs md:pt-3">
              <Link
                href={`/users/edit/${id}`}
                className="rounded-3xl border-2 border-orange-400 bg-white px-4 py-1 text-orange-400"
              >
                編集
              </Link>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="rounded-3xl bg-orange-400 px-4 py-1 text-white"
              >
                削除
              </button>
            </div>
          )}
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

export default UserRecipeItem;
