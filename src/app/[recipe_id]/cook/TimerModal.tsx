import { SetStateAction, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { num2TimerText, str2TimerText } from "./timerFunc";

const ModalContainer = ({ children }: { children: React.JSX.Element }) => {
  const container = document.getElementById("container");
  if (!container) {
    return null;
  }
  return createPortal(children, container);
};

const TimerModal = ({
  timerModalOpen,
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
    if (min > 999) {
      setTimerDisp(num2TimerText(999, 59, setMin, setSec, true));
    } else {
      setTimerDisp(num2TimerText(min, sec, setMin, setSec, true));
    }
    if (min == 0 && sec == 0 && !playing) {
      setInUse(false);
    } else {
      setInUse(true);
    }
  }, [update, setTimerDisp, setInUse, min, playing]);

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
            alarm.current
              .play()
              .then(() => {
                setPlaying(true);
              })
              .catch((/*error*/) => {
                setPlaying(true);
                setTimeout(() => {
                  reset();
                }, 8000);
              });
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
                <div className="bg-white mx-3 sm:mx-5 md:mx-20 shadow-lg text-black rounded-2xl p-3 sm:p-4">
                  <div className="flex w-full justify-end mb-2 sm:mb-3">
                    <IoMdClose
                      onClick={modalClose}
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 m-1 sm:m-2"
                    />
                  </div>
                  <div className="font-sans font-bold text-7xl sm:text-[84px] md:text-8xl text-center mb-4 sm:mb-5">
                    {timerDisp}
                  </div>
                  <div className="w-full font-bold mb-2">
                    <div className="flex justify-between mx-2 sm:mx-4 md:mx-5 mb-4 sm:mb-5 leading-none">
                      <button
                        onClick={() => {
                          setMin(min + 60);
                          setUpdate(!update);
                          if (start) setStart(false);
                        }}
                        className="bg-orange-400 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-sm sm:text-base"
                      >
                        +60分
                      </button>
                      <button
                        onClick={() => {
                          setMin(min + 10);
                          setUpdate(!update);
                          if (start) setStart(false);
                        }}
                        className="bg-orange-400 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-sm sm:text-base"
                      >
                        +10分
                      </button>
                      <button
                        onClick={() => {
                          setMin(min + 1);
                          setUpdate(!update);
                          if (start) setStart(false);
                        }}
                        className="bg-orange-400 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-sm sm:text-base"
                      >
                        +1分
                      </button>
                      <button
                        onClick={() => {
                          setSec(sec + 10);
                          setUpdate(!update);
                          if (start) setStart(false);
                        }}
                        className="bg-orange-400 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-sm sm:text-base"
                      >
                        +10秒
                      </button>
                    </div>
                    <div className="flex justify-between mx-2 sm:mx-4 md:mx-5 mb-4 sm:mb-5">
                      <button
                        onClick={() => start_stop()}
                        className="text-base sm:text-xl md:text-2xl tracking-tighter leading-none bg-orange-400 text-white rounded-full w-32 h-14 sm:w-36 sm:h-16 md:w-40 md:h-20 mr-2 sm:mr-3"
                      >
                        {start ? "ストップ" : "スタート"}
                      </button>
                      <button
                        onClick={() => reset()}
                        className="text-base sm:text-xl md:text-2xl tracking-tighter bg-orange-100 text-orange-400 rounded-full w-32 h-14 sm:w-36 sm:h-16 md:w-40 md:h-20"
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
        <div className="left-1/2 -translate-x-1/2 z-10 fixed top-[85px]">
          <div className="w-48 bg-orange-400 text-white text-2xl text-center rounded-full px-1 py-0.5 shadow-lg">
            {timerDisp}
          </div>
          <div className="flex justify-between mt-2">
            <div
              className="bg-orange-400 rounded-full shadow-lg ml-4 py-1 px-2 font-semibold text-sm cursor-pointer text-white"
              onClick={() => start_stop()}
            >
              {start ? "ストップ" : "スタート"}
            </div>
            <div
              className="bg-orange-400 rounded-full shadow-lg mr-4 py-1 px-2 font-semibold text-sm cursor-pointer text-white"
              onClick={() => reset()}
            >
              リセット
            </div>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default TimerModal;
