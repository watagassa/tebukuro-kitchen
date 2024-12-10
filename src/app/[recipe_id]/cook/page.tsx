"use client";

import RecipeHeader from "@/app/conponents/RecipeHeader";
import Speech from "@/app/conponents/Speech";
import { Descript, Ingredient } from "@/app/types";
import {
  getByDescriptId,
  getByIngredientId,
  getRecipesbyId,
} from "@/app/utils/supabaseFunctions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaArrowRight, FaDoorOpen } from "react-icons/fa";
import { FiCameraOff } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { PiNoteDuotone } from "react-icons/pi";
import GuideModal from "./GuideModal";
import IngModal from "./IngModal";
import TimerModal from "./TimerModal";
import YtModal from "./YtModal";

//丸を描画する　length=丸の数　page=塗りつぶし判定用ページ数
const Circle = ({ length, page }: { length: number; page: number }) => {
  return (
    <>
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className={`mx-2 w-2 h-2 border border-black rounded-full ${
            page == index ? "bg-orange-400" : ""
          }`}
        ></div>
      ))}
    </>
  );
};

const ModalContainer = ({ children }: { children: React.JSX.Element }) => {
  const container = document.getElementById("container");
  if (!container) {
    return null;
  }
  return createPortal(children, container);
};

const Cook = ({
  params,
  searchParams,
}: {
  params: { recipe_id: number };
  searchParams: { from?: string };
}) => {
  const [title, setTitle] = useState<string>(""); // 料理画面　上部タイトル
  const [howMany, setHowMany] = useState<string>(""); // 材料表示　何人前
  const [descript, setDescript] = useState<Descript[]>([]); // レシピの説明文　データベースから取得
  const [ingredient, setIngredient] = useState<Ingredient[]>([]); // 材料　データベースから取得

  // データベースからデータの取得
  useEffect(() => {
    const getRecipes = async () => {
      const rec = await getRecipesbyId(params.recipe_id);
      const desc = await getByDescriptId(params.recipe_id);
      const ing = await getByIngredientId(params.recipe_id);
      setTitle(rec[0].name);
      rec[0].howmany ? setHowMany(rec[0].howmany) : setHowMany("");
      setDescript(desc);
      setIngredient(ing);
    };
    getRecipes();
  }, [params.recipe_id]);
  const length = descript.length; // 説明文のページ数

  const [page, setPage] = useState(0); //現在のページ（番号）

  // モーダル開閉の判定
  const [ingModalOpen, setIngModalOpen] = useState(false);
  const [ytModalOpen, setYtModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [timerModalOpen, setTimerModalOpen] = useState(false);

  const [keyword, setKeyword] = useState(""); // 動画検索ワード　YtModal(youtube)用

  const [inputTime, setInputTime] = useState(""); // 音声で認識したタイマーの時間
  const [timerStart, setTimerStart] = useState(false); // タイマーがスタートされているかどうか
  const [timerDisp, setTimerDisp] = useState(""); // タイマーのテキスト
  const [timerReset, setTimerReset] = useState(false);

  // 音声認識コンポーネントでのページ操作用関数
  const back = (
    num: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    num == 0 ? setPage(num) : setPage(num - 1);
  };
  const next = (
    num: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    num == page - 1 ? setPage(num) : setPage(num + 1);
  };

  // ヘッダーの戻るボタン用
  const from = searchParams?.from;
  const recipePage =
    from === "favorites"
      ? `/${params.recipe_id}?from=favorites`
      : `/${params.recipe_id}`;

  const imageSrc = descript[page]?.image_url ?? ""; // 画像のＵＲＬ

  return (
    <>
      <div className="bg-white fixed inset-x-0 top-0 bottom-0 -z-50">
        <div className="relative">
          <RecipeHeader
            bgColor="bg-orange-400"
            textColor="text-white"
            title={title}
            link={recipePage}
            iconFill="white"
          />
          {title != "" ? ( //ヘッダーのタイトルのロードが完了したら表示（より自然に）
            <button
              onClick={() => setGuideModalOpen(!guideModalOpen)}
              className="absolute top-0.5 right-1 bg-transparent font-bold p-3 text-white z-50"
            >
              <IoChatbubbleEllipsesOutline className="w-6 h-6 mx-auto" />
              ガイド
            </button>
          ) : (
            <span></span>
          )}
        </div>
        <Speech
          next={next}
          back={back}
          num={page}
          length={length}
          setPage={setPage}
          setIngModalOpen={setIngModalOpen}
          setYtModalOpen={setYtModalOpen}
          setKeyword={setKeyword}
          setGuideModalOpen={setGuideModalOpen}
          setTimerModalOpen={setTimerModalOpen}
          setInputTime={setInputTime}
          setTimerStart={setTimerStart}
          timerReset={timerReset}
          setTimerReset={setTimerReset}
        />

        <div className="flex justify-center content-center">
          {imageSrc != "" ? (
            <div className="relative w-[100vw] h-[42vh] image-mid:h-[25vh] image-sml:h-[20vh]">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-contain shadow-lg"
                onError={() => console.error("Image failed to load")}
              />
            </div>
          ) : (
            <div className="shadow-lg content-center bg-gray-100 w-[100vw] h-[42vh] image-mid:h-[25vh] image-sml:h-[20vh]">
              <div className="w-full">
                <FiCameraOff size={40} stroke="#737373" className="mx-auto" />
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 mb-10 flex justify-center image-mid:mb-2 image-mid:mt-5 image-sml:mb-0 image-sml:mt-2">
          <Circle length={length} page={page} />
        </div>
        <div
          id="desc"
          className="mx-5 font-mono font-black text-left text-black text-2xl break-words"
        >
          {descript[page]?.text ?? "読み込み中・・・"}
        </div>

        {/* 動画表示デバッグ用 */}
        {/* <div className="w-full flex justify-between fixed bottom-14">
        <button
          onClick={() => setYtModalOpen(!ytModalOpen)}
          className="bg-black"
        >
          動画表示
        </button>
      </div> */}

        <div id="container">
          {ingModalOpen && (
            <ModalContainer>
              <IngModal
                modalClose={() => {
                  setIngModalOpen(false);
                }}
                ingredient={ingredient}
                descript={descript[page]?.text}
                howMany={howMany}
              />
            </ModalContainer>
          )}
          {ytModalOpen && (
            <ModalContainer>
              <YtModal
                modalClose={() => {
                  setYtModalOpen(false);
                }}
                keyword={keyword}
              />
            </ModalContainer>
          )}
          {guideModalOpen && (
            <ModalContainer>
              <GuideModal
                modalClose={() => {
                  setGuideModalOpen(false);
                }}
              />
            </ModalContainer>
          )}
          <TimerModal
            timerModalOpen={timerModalOpen}
            modalClose={() => setTimerModalOpen(false)}
            inputTime={inputTime}
            setInputTime={setInputTime}
            start={timerStart}
            setStart={setTimerStart}
            timerDisp={timerDisp}
            setTimerDisp={setTimerDisp}
            timerReset={timerReset}
          />
        </div>

        {/* フッター */}
        <div className="z-20 bg-orange-400 w-full fixed bottom-0 h-14 flex justify-center text-white">
          <div className="text-white flex justify-between fixed bottom-0 z-30 w-full h-14">
            {page == 0 ? (
              <div className="w-20 h-14">
                <div className="w-6 h-6 mx-7"></div>
              </div>
            ) : (
              <button
                onClick={() => setPage(page - 1)}
                className="w-20 h-14 bg-transparent font-bold"
              >
                <FaArrowLeft className="w-6 h-6 mx-7" />
                戻って
              </button>
            )}
            <button
              onClick={() => setIngModalOpen(!ingModalOpen)}
              className="bg-transparent font-bold hidden button:block"
            >
              <PiNoteDuotone className="w-6 h-6 mx-7" />
              材料は?
            </button>
            <button
              onClick={() => setTimerModalOpen(!timerModalOpen)}
              className="bg-transparent font-bold hidden button:block"
            >
              <MdOutlineTimer className="w-6 h-6 mx-7" />
              <p className="text-xs tracking-tighter leading-none">
                〜分〜秒
                <br />
                セット
              </p>
            </button>
            {page == length - 1 ? (
              <Link href={recipePage} className="font-bold">
                <FaDoorOpen className="w-6 h-6 mx-7 my-1 mb-0" />
                <div className="text-center">終了</div>
              </Link>
            ) : (
              <button
                onClick={() => setPage(page + 1)}
                className="w-20 h-14 bg-transparent font-bold"
              >
                <FaArrowRight className="w-6 h-6 mx-7" />
                進んで
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cook;
