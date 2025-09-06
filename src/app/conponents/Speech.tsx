"use client";

import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";
import { FiMic } from "react-icons/fi";

type screenController = {
  next: (
    num: number,
    length: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
  ) => void;
  back: (
    num: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
  ) => void;
};

const Speech = ({
  next,
  back,
  num,
  length,
  setPage,
  setIngModalOpen,
  setYtModalOpen,
  setKeyword,
  setGuideModalOpen,
  setTimerModalOpen,
  setInputTime,
  setTimerStart,
  setTimerReset,
  setVoiceEnabled,
  voiceSpeed,
  setVoiceSpeed,
  setRepeatFlag,
}: {
  next: screenController["next"];
  back: screenController["back"];
  num: number;
  length: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setIngModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setYtModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setGuideModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTimerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInputTime: React.Dispatch<React.SetStateAction<string>>;
  setTimerStart: React.Dispatch<React.SetStateAction<boolean>>;
  setTimerReset: React.Dispatch<React.SetStateAction<boolean>>;
  setVoiceEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  voiceSpeed: number;
  setVoiceSpeed: React.Dispatch<React.SetStateAction<number>>;
  setRepeatFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [response, setResponse] = useState("");

  // useStateすごい
  // const [lastModalStateAction, setLastModalStateAction] = useState<
  //   React.Dispatch<React.SetStateAction<boolean>> | undefined
  // >(undefined);
  // useEffect(() => {
  //   setLastModalStateAction(() => setIngModalOpen);
  //   if (lastModalStateAction) {
  //     lastModalStateAction(true);
  //   }
  // }, [lastModalStateAction, setLastModalStateAction, setIngModalOpen]);

  const commands = [
    {
      command: /.*(進んで|進む|次へ|次).*/,
      // *印は、雑音に影響されないよう命令の前後の文言を許容するため。起こる恐れのあるバグが不明のため、要検証
      callback: () => {
        next(num, length, setPage);
        resetTranscript();
        setResponse("進みます");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(戻って|戻る|前へ|前).*/,
      callback: () => {
        back(num, setPage);
        resetTranscript();
        setResponse("戻ります");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(材料).*/,
      callback: () => {
        setIngModalOpen(true);
        resetTranscript();
        setResponse("材料を表示します");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(閉じて|閉じる).*/,
      callback: () => {
        // TODO 最前面のモーダルだけ閉じるようにしたい
        setIngModalOpen(false);
        setYtModalOpen(false);
        setGuideModalOpen(false);
        setTimerModalOpen(false);
        resetTranscript();
        setResponse("表示を閉じます");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(スタート).*/,
      callback: () => {
        setTimerStart(true);
        resetTranscript();
        setResponse("タイマーをスタートします");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(ストップ).*/,
      callback: () => {
        setTimerStart(false);
        resetTranscript();
        setResponse("タイマーをストップします");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(リセット).*/,
      callback: () => {
        setTimerReset((prev) => !prev);
        resetTranscript();
        setResponse("タイマーをリセットします");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /タイマー(.*)セット.*/,
      callback: (material: string) => {
        setInputTime(material.replace(/\s+/g, "")); //スペース削除
        resetTranscript();
        setResponse(
          `タイマーを"${material.replace(/\s+/g, "")}"に設定しました`,
        );
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /(.*)ってどうするの.*/,
      callback: (material: string) => {
        // FIXME いちょう切りが胃腸切りになっちゃう
        setKeyword(material);
        setYtModalOpen(true);
        // setResponse(`${material}`);
        console.log("[get]", material);
        resetTranscript();
        setResponse(`"${material}"の動画を表示します`);
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(ガイド).*/,
      callback: () => {
        setGuideModalOpen(true);
        resetTranscript();
        setResponse("ガイドを表示します");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(もう一度).*/,
      callback: () => {
        setRepeatFlag((prev) => !prev);
        resetTranscript();
        setResponse("もう一度読み上げます");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(読み上げて).*/,
      callback: () => {
        setVoiceEnabled(true);
        resetTranscript();
        setResponse("音声読み上げをONにしました");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(読み上げないで).*/,
      callback: () => {
        setVoiceEnabled(false);
        resetTranscript();
        setResponse("音声読み上げをOFFにしました");
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(早口で).*/,
      callback: () => {
        setVoiceSpeed((prev) => (prev < 2 ? prev + 0.25 : prev));
        resetTranscript();
        setResponse(
          `読み上げ速度を${voiceSpeed < 2 ? voiceSpeed + 0.25 : voiceSpeed}に設定しました`,
        );
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
    {
      command: /.*(ゆっくりで).*/,
      callback: () => {
        setVoiceSpeed((prev) => (prev > 0.25 ? prev - 0.25 : prev));
        resetTranscript();
        setResponse(
          `読み上げ速度を${voiceSpeed > 0.25 ? voiceSpeed - 0.25 : voiceSpeed}に設定しました`,
        );
        SpeechRecognition.startListening({ continuous: true });
      },
      matchInterim: true,
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    // browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  // ここの処理はなくても良さそう。認識が止まることがあれば戻す。
  // const [lastTranscript, setLastTranscript] = useState(""); // 最後に処理したtranscript
  // useEffect(() => {
  //   if (transcript && transcript !== lastTranscript) {
  //     // コマンドで処理されなかった場合の処理
  //     // 認識停止予防
  //     if (response === "") {
  //       SpeechRecognition.startListening({ continuous: true });
  //     }
  //     setLastTranscript(transcript);
  //   }
  // }, [transcript, lastTranscript, response]);

  // マウント時認識開始、アンマウント時停止
  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);
  // 音声認識が停止したときに再スタートする処理
  // 認識停止予防
  useEffect(() => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  // デバッグ用
  // useEffect(() => {
  //   console.log("[input] " + transcript);
  // }, [transcript]);

  // if (!browserSupportsSpeechRecognition) {
  //   console.log("Speech conponent ERROR");
  // }

  // 数秒後に response を消す処理
  useEffect(() => {
    if (!response) return; // response が空なら何もしない

    const timer = setTimeout(() => {
      setResponse("");
    }, 2500); // ← 2.5秒後に消える（必要なら秒数変更）

    return () => clearTimeout(timer); // クリーンアップ
  }, [response]);

  return (
    <>
      {transcript && (
        <div className="ml-4 flex w-full font-mono">
          <div className="fixed bottom-[4.5rem] z-10 flex max-w-[80vw] rounded-md border border-orange-200 bg-orange-50 p-2 pl-1">
            <FiMic className="mr-1 h-5 w-5 text-orange-400" />
            <span className="my-auto flex max-w-[65vw] justify-end overflow-hidden whitespace-nowrap text-sm text-gray-400">
              {transcript}
            </span>
          </div>
        </div>
      )}
      {response && (
        <div className="flex w-full items-center justify-center">
          <div
            className={`fixed bottom-0 z-10 mb-16 flex max-w-[80vw] items-center rounded-md border border-orange-200 bg-orange-50 p-2 pl-1 shadow-lg ${
              response ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src="/tebukuro.svg"
              alt="tebukuroicon"
              className="mr-1 h-5 w-5 text-orange-400"
            />
            <span className="my-auto flex max-w-[65vw] justify-end overflow-hidden whitespace-nowrap text-sm font-thin text-black">
              「{response}」
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Speech;
