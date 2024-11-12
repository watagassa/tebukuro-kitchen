import { SetStateAction, useEffect, useRef, useState } from "react";
import { num2TimerText, str2TimerText } from "./timerFunc";
import { IoMdClose } from "react-icons/io";
import { createPortal } from "react-dom";

const ModalContainer = ({ children }: { children: React.JSX.Element }) => {
  const container = document.getElementById("container");
  if (!container) {
    return null;
  }
  return createPortal(children, container);
};

const TimerModal = ({
  timerModalOpen,
  setTimerModalOpen,
  modalClose,
  inputTime,
  setInputTime,
  start,
  setStart,
  timerDisp,
  setTimerDisp,
  timerReset,
}: {
  timerModalOpen: boolean;
  setTimerModalOpen: React.Dispatch<SetStateAction<boolean>>;
  modalClose: () => void;
  inputTime: string;
  setInputTime: React.Dispatch<SetStateAction<string>>;
  start: boolean;
  setStart: React.Dispatch<SetStateAction<boolean>>;
  timerDisp: string;
  setTimerDisp: React.Dispatch<SetStateAction<string>>;
  timerReset: boolean;
}) => {
  const [inUse, setInUse] = useState(false); // タイマーの使用中判定（左下表示判定用）
  const [update, setUpdate] = useState(false); // 値更新検出用

  const [min, setMin] = useState(0); // 分
  const [sec, setSec] = useState(0); // 秒

  const alarm = useRef<HTMLAudioElement>(); // アラーム用変数
  const [playing, setPlaying] = useState(false); // アラームが再生しているかどうか
  // アラームの初期化
  useEffect(() => {
    alarm.current = new Audio("/TimerAlarm.mp3");
  }, [alarm]);

  // 音声入力された時のみ変換して初期化
  useEffect(() => {
    if (inputTime != "") {
      const { m, s } = str2TimerText(inputTime);
      setMin(m);
      setSec(s);
      setInUse(true);
      setUpdate(!update);
      setInputTime(""); //一旦毎回リセットするようにする
    }
  }, [inputTime, setInputTime, setInUse, update]);

  // タイマー更新関数
  useEffect(() => {
    setTimerDisp(num2TimerText(min, sec, setMin, setSec, true));
    if (min == 0 && sec == 0) {
      setInUse(false);
    } else {
      setInUse(true);
    }
  }, [update, setTimerDisp, setInUse]);

  // アラーム終了時の処理　（終了するまではstart判定はtrueのまま）
  if (alarm.current) {
    alarm.current.onended = () => {
      setStart(false);
      reset();
    };
  }

  // タイマーのインターバル処理
  useEffect(() => {
    setTimerDisp(num2TimerText(min, sec, setMin, setSec, false));
    let manager: NodeJS.Timeout;
    if (start) {
      manager = setInterval(() => {
        if (sec <= 0 && min == 0) {
          clearInterval(manager);
          if (alarm.current) {
            alarm.current.play();
            setPlaying(true);
          }
        } else {
          setSec(sec - 1);
          if (sec == 0) {
            setSec(59);
            setMin(min - 1);
          }
        }
        setTimerDisp(num2TimerText(min, sec, setMin, setSec, false));
      }, 1000);
    }
    return () => {
      if (manager) {
        clearInterval(manager);
      }
    };
  }, [setTimerDisp, start, setStart, min, sec]);

  // リセットボタン
  const reset = () => {
    if (alarm.current) {
      alarm.current.pause();
      alarm.current.currentTime = 0;
      setPlaying(false);
    }
    setMin(0);
    setSec(0);
    setStart(false);
    setUpdate(!update);
  };

  // スタート、ストップボタン
  const start_stop = () => {
    if (min !== 0 || sec !== 0) setStart(!start);
    else reset();
  };

  // アラームが鳴っている時のストップボタン
  useEffect(() => {
    if (playing && (min == 0 || sec == 0)) reset();
  }, [start]);

  // 音声認識でのリセット検出
  useEffect(() => {
    reset();
  }, [timerReset]);

  // 背景押したら閉じるやつ
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  return (
    <>
      {timerModalOpen && (
        <ModalContainer>
          <div className={timerModalOpen ? "block" : "hidden"}>
            <div className="bg-black bg-opacity-50 fixed inset-x-0 top-0 bottom-0">
              <div
                onClick={bgClickClose}
                className="flex justify-center items-center h-full"
              >
                <div className="bg-white mx-20 w-full shadow-lg text-black rounded-3xl">
                  <div className="flex w-full justify-end mb-3">
                    <IoMdClose onClick={modalClose} className="w-10 h-10 m-2" />
                  </div>
                  <div className="font-sans font-bold mx-5 mb-5 text-8xl text-center">
                    {timerDisp}
                  </div>
                  <div className="w-full font-bold mb-2">
                    <div className="flex justify-between mx-5 mb-5 leading-none">
                      <button
                        onClick={() => {
                          setMin(min + 60);
                          setUpdate(!update);
                          if (start) setStart(false);
                        }}
                        className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                      >
                        +60分
                      </button>
                      <button
                        onClick={() => {
                          setMin(min + 10);
                          setUpdate(!update);
                          if (start) setStart(false);
                        }}
                        className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                      >
                        +10分
                      </button>
                      <button
                        onClick={() => {
                          setMin(min + 1);
                          setUpdate(!update);
                          if (start) setStart(false);
                        }}
                        className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                      >
                        +1分
                      </button>
                      <button
                        onClick={() => {
                          setSec(sec + 10);
                          setUpdate(!update);
                          if (start) setStart(false);
                        }}
                        className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                      >
                        +10秒
                      </button>
                    </div>
                    <div className="flex justify-between mx-5 mb-5">
                      <button
                        onClick={() => start_stop()}
                        className="text-2xl tracking-tighter leading-none bg-orange-400 text-white rounded-full w-40 h-20 mr-5"
                      >
                        {start ? "ストップ" : "スタート"}
                      </button>
                      <button
                        onClick={() => reset()}
                        className="text-2xl tracking-tighter bg-orange-100 text-orange-400 rounded-full w-40 h-20"
                      >
                        リセット
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalContainer>
      )}

      {/* 左下のミニタイマー */}
      {inUse ? (
        <div
          onClick={() => setTimerModalOpen(true)}
          className="z-10 text-3xl w-36 fixed bottom-16 bg-orange-100 text-black text-center rounded-full p-1 ml-2 shadow-lg"
        >
          {timerDisp}
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default TimerModal;
