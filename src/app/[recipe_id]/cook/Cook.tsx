"use client";

import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { FaArrowLeft, FaArrowRight, FaDoorOpen } from "react-icons/fa";
import { FiCameraOff, FiVolume2 } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";
import { PiNoteDuotone } from "react-icons/pi";

import GuideModal from "./GuideModal";
import IngModal from "./IngModal";
import TimerModal from "./TimerModal";
import YtModal from "./YtModal";
import VoiceSettingsModal from "./VoiceSettingsModal";
import RecipeHeader from "@/app/conponents/RecipeHeader";
import Speech from "@/app/conponents/Speech";
import { Descript, Ingredient } from "@/app/types";
import {
  getByDescriptId,
  getByIngredientId,
  getRecipesbyId,
} from "@/app/utils/supabaseFunctionsNew";
import { getVoice } from "@/app/utils/text-to-speech";

//丸を描画する length=丸の数 page=塗りつぶし判定用ページ数
const Circle = ({ length, page }: { length: number; page: number }) => {
  return (
    <div className="text-black">
      {page + 1 <= 10 ? (
        <>
          <span className="m-2 rounded-full bg-orange-400 p-1 px-2 text-white">
            {page + 1}
          </span>
          / {length}
        </>
      ) : (
        <>
          <span className="m-2 rounded-full bg-orange-400 p-1 px-1 text-white">
            {page + 1}
          </span>
          / {length}
        </>
      )}
    </div>
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
  setInCook,
}: {
  params: { recipe_id: number };
  searchParams: { from?: string };
  setInCook: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState<string>(""); // 料理画面 上部タイトル
  const [howMany, setHowMany] = useState<string>(""); // 材料表示 何人前
  const [descript, setDescript] = useState<Descript[]>([]); // レシピの説明文 データベースから取得
  const [ingredient, setIngredient] = useState<Ingredient[]>([]); // 材料 データベースから取得

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
  const [voiceSettingsModalOpen, setVoiceSettingsModalOpen] = useState(false);

  const [keyword, setKeyword] = useState(""); // 動画検索ワード YtModal(youtube)用

  // タイマー関連
  const [inputTime, setInputTime] = useState(""); // 音声で認識したタイマーの時間
  const [timerStart, setTimerStart] = useState(false); // タイマーがスタートされているかどうか
  const [timerReset, setTimerReset] = useState(false);

  // 音声設定関連
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceVolume, setVoiceVolume] = useState(50);
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [timerAlarmVolume, setTimerAlarmVolume] = useState(50);
  const [repeatFlag, setRepeatFlag] = useState(false);

  // 音声認識コンポーネントでのページ操作用関数
  const back = (
    num: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    num == 0 ? setPage(num) : setPage(num - 1);
  };
  const next = (
    num: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
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

  // 音声読み上げの処理
  const audio = useRef<HTMLAudioElement>();
  useEffect(() => {
    // 音声読み上げがOFFの場合は何もしない
    if (!voiceEnabled) {
      return;
    }

    // このuseEffectの処理が中断されたかどうかを判定するフラグ
    let isCancelled = false;

    const playSpeech = async () => {
      const textToSpeak = descript[page]?.text;
      if (!textToSpeak) return;

      try {
        // 既存の音声を停止
        if (audio.current) {
          audio.current.pause();
        }

        const data = await getVoice(textToSpeak, voiceSpeed);

        // APIからデータ取得後に処理が中断されていないかチェック
        if (isCancelled) {
          return; // 中断されていたら再生しない
        }

        if (data.audioContent) {
          audio.current = new Audio(
            "data:audio/mp3;base64," + data.audioContent,
          );
          // 再生直前にもう一度チェック
          if (isCancelled) {
            return;
          }
          await audio.current.play();
        }
      } catch (error) {
        // 中断によるエラーでなければコンソールに出力
        if (!isCancelled) {
          console.error("Speech generation failed:", error);
        }
      }
    };

    playSpeech();

    // クリーンアップ関数
    return () => {
      isCancelled = true; // フラグを立てて、進行中のAPIレスポンス後の処理を止める
      if (audio.current) {
        audio.current.pause(); // 現在再生中の音声を即座に停止
        audio.current.currentTime = 0;
      }
    };
  }, [descript, page, voiceSpeed, voiceEnabled, repeatFlag]);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 top-0 -z-50 bg-white">
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
          setTimerReset={setTimerReset}
          setVoiceEnabled={setVoiceEnabled}
          voiceSpeed={voiceSpeed}
          setVoiceSpeed={setVoiceSpeed}
          setRepeatFlag={setRepeatFlag}
        />
        <div className="relative">
          <RecipeHeader
            bgColor="bg-orange-400"
            textColor="text-white"
            title={title}
            link={recipePage}
            iconFill="white"
            guideModalOpen={guideModalOpen}
            setGuideModalOpen={setGuideModalOpen}
            setInCook={setInCook}
          />
        </div>

        <div className="flex content-center justify-center">
          {imageSrc != "" ? (
            <div className="relative h-[42vh] w-[100vw] image-mid:h-[25vh] image-sml:h-[20vh]">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-contain shadow-lg"
                onError={() => console.error("Image failed to load")}
              />
            </div>
          ) : (
            <div className="h-[42vh] w-[100vw] content-center bg-gray-100 shadow-lg image-mid:h-[25vh] image-sml:h-[20vh]">
              <div className="w-full">
                <FiCameraOff size={40} stroke="#737373" className="mx-auto" />
              </div>
            </div>
          )}
        </div>
        <div className="mb-4 ml-4 mt-6 image-mid:mb-2 image-mid:mt-5 image-sml:mb-0 image-sml:mt-2">
          <Circle length={length} page={page} />
        </div>
        <div
          id="desc"
          className="mx-5 break-words text-left font-mono text-2xl font-black text-black"
        >
          {descript[page]?.text ?? "読み込み中・・・"}
        </div>
        <button
          onClick={() => setVoiceSettingsModalOpen(!voiceSettingsModalOpen)}
          className="fixed bottom-[4.5rem] right-4 rounded-full bg-orange-50 p-2 shadow-lg"
        >
          <FiVolume2 className="size-7 font-semibold text-orange-400" />
        </button>

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
            timerReset={timerReset}
          />
          {voiceSettingsModalOpen && (
            <VoiceSettingsModal
              modalClose={() => {
                setVoiceSettingsModalOpen(false);
              }}
              voiceEnabled={voiceEnabled}
              setVoiceEnabled={setVoiceEnabled}
              voiceVolume={voiceVolume}
              setVoiceVolume={setVoiceVolume}
              voiceSpeed={voiceSpeed}
              setVoiceSpeed={setVoiceSpeed}
              timerAlarmVolume={timerAlarmVolume}
              setTimerAlarmVolume={setTimerAlarmVolume}
            />
          )}
        </div>

        {/* フッター */}
        <div className="fixed bottom-0 z-20 flex h-14 w-full justify-center bg-orange-400 text-white">
          <div className="fixed bottom-0 z-30 flex h-14 w-full justify-between text-white">
            {page == 0 ? (
              <div className="h-14 w-20">
                <div className="mx-7 h-6 w-6"></div>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (audio.current) audio.current.pause();
                  setPage(page - 1);
                }}
                className="h-14 w-20 bg-transparent font-bold"
              >
                <FaArrowLeft className="mx-7 h-6 w-6" />
                戻って
              </button>
            )}
            <button
              onClick={() => setIngModalOpen(!ingModalOpen)}
              className="hidden bg-transparent font-bold button:block"
            >
              <PiNoteDuotone className="mx-7 h-6 w-6" />
              材料
            </button>
            <button
              onClick={() => setTimerModalOpen(!timerModalOpen)}
              className="hidden bg-transparent font-bold button:block"
            >
              <MdOutlineTimer className="mx-7 h-6 w-6" />
              <p className="text-xs leading-none tracking-tighter">
                タイマー
                <br />
                O分セット
              </p>
            </button>
            {page == length - 1 ? (
              <Link href={recipePage} className="font-bold">
                <FaDoorOpen className="mx-7 my-1 mb-0 h-6 w-6" />
                <div className="text-center">終了</div>
              </Link>
            ) : (
              <button
                onClick={() => {
                  if (audio.current) audio.current.pause();
                  setPage(page + 1);
                }}
                className="h-14 w-20 bg-transparent font-bold"
              >
                <FaArrowRight className="mx-7 h-6 w-6" />
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
