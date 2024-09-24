"use client";

import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";

const Speech = ({
  next,
  back,
  num,
  page,
  setId,
}: {
  next: Function;
  back: Function;
  num: number;
  page: number;
  setId: Function;
}) => {
  const [message, setMessage] = useState("");
  const [lastTranscript, setLastTranscript] = useState(""); // 最後に処理したtranscript

  const [status, setStatus] = useState("");

  const commands = [
    {
      command: "進んで",
      callback: () => {
        next(num, page, setId);
        setStatus("next");
        setMessage("進みます");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "戻って",
      callback: () => {
        back(num, setId);
        setStatus("prev");
        setMessage("戻ります");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "材料を表示して",
      callback: () => {
        setStatus("show");
        setMessage("材料を表示します");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "タイマーをスタート",
      callback: () => {
        setStatus("start");
        setMessage("タイマーをスタート");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "タイマーをストップ",
      callback: () => {
        setStatus("stop");
        setMessage("タイマーをストップ");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "タイマーをリセット",
      callback: () => {
        setStatus("reset");
        setMessage("タイマーをリセット");
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*の量は",
      callback: (material: string) => {
        setStatus(`amount ${material}`);
        setMessage(`${material}の量はこの通りです`);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
    {
      command: "*ってどうやる",
      callback: (material: string) => {
        setStatus(`how ${material}`);
        setMessage(`${material}はこのような切り方です`);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
      },
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (transcript && transcript !== lastTranscript) {
      // コマンドで処理されなかった場合の処理
      // 認識停止予防
      if (message === "") {
        SpeechRecognition.startListening({ continuous: true });
      }
      setLastTranscript(transcript);
    }
  }, [transcript, lastTranscript, message]);

  // 音声認識が停止したときに再スタートする処理
  // 認識停止予防
  useEffect(() => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    console.log("useSpeech ERROR");
  }

  useEffect(() => {
    console.log("Current status:", status);
  }, [status]);

  return (
    <>
      {/* デバッグ用 */}
      {/* <p>response : {message}</p>
      <p>input : {transcript}</p>
      <p>status : {status}</p> */}
    </>
  );
};

export default Speech;
