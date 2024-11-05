/*
  TODO
  inputTime = 音声で入力された時間（５分半とか）
  音声認識で表示させる場合はこれを使って時間を設定する。
  そうでない場合、つまり手で直接時間を入力する場合は、
  inputTimeが空の時なので、条件分岐して別途方法を作る。（今のところは既存のモーダルを活用する予定）
  
  理想
    もし　音声認識で時間が入力されたなら、
      inputTimeを時間に変換しh,m,sに代入、タイマーを設定して左下に小さく表示
    でなければ
      時間設定用のモーダルを表示、内容をh,m,sに代入
      スタートボタンを押したら、左下に小さく表示する。押される前に閉じられたら、何もせず入力をリセットする
  
  共通事項
    左下に小さく表示されたタイマーは、タップするとモーダルが表示される。

  数字をボタンではなくiphoneのアラームみたいにスライドで設定できるようにしたい（優先度は低め）

  FIXME
  h,m,sは手動入力すると60以上の数字にすることができる。すると、タイマーが0になっても内部的には0になっていない時が発生する
  inUseの判定に0を使っているため、左下の表示が消えなくなる。
  num2TimerTextにh,m,sの参照をそのまま渡せば対処できると思うが、果たしてそれは適切なのかどうか...
*/

import { SetStateAction, useEffect, useRef, useState } from "react";
import { num2TimerText, str2TimerText } from "./timerFunc";
import { IoMdClose } from "react-icons/io";

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
}) => {
  const [inUse, setInUse] = useState(false); // タイマーの使用中判定（左下表示判定用）
  const [update, setUpdate] = useState(false); // 値更新検出用
  const m = useRef(0);
  const s = useRef(0);

  // 音声入力された時のみ変換して初期化
  useEffect(() => {
    if (inputTime != "") {
      const { min, sec } = str2TimerText(inputTime);
      m.current = min;
      s.current = sec;
      setInUse(true);
      setUpdate(!update);
      setInputTime(""); //一旦毎回リセットするようにする
    }
  }, [inputTime, setInputTime, setInUse, update]);

  useEffect(() => {
    setTimerDisp(num2TimerText(m.current, s.current));
    if (m.current == 0 && s.current == 0) {
      setInUse(false);
    } else {
      setInUse(true);
    }
  }, [update, setTimerDisp, setInUse]);

  useEffect(() => {
    const alarm = new Audio("/TimerAlarm.mp3");
    setTimerDisp(num2TimerText(m.current, s.current));
    let manager: NodeJS.Timeout;
    if (start) {
      manager = setInterval(() => {
        if (s.current <= 0 && m.current == 0) {
          clearInterval(manager);
          setStart(false);
          alarm.play();
        } else {
          s.current--;
          if (s.current == -1) {
            s.current = 59;
            m.current--;
          }
        }
        setTimerDisp(num2TimerText(m.current, s.current));
      }, 1000);
    }
    return () => {
      if (manager) {
        clearInterval(manager);
      }
    };
  }, [setTimerDisp, start, setStart]);

  const reset = () => {
    m.current = 0;
    s.current = 0;
    setStart(false);
    setUpdate(!update);
  };
  const bgClickClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  return (
    <>
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
                      m.current += 10;
                      setUpdate(!update);
                      if (start) setStart(false);
                    }}
                    className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                  >
                    +10分
                  </button>
                  <button
                    onClick={() => {
                      m.current += 5;
                      setUpdate(!update);
                      if (start) setStart(false);
                    }}
                    className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                  >
                    +5分
                  </button>
                  <button
                    onClick={() => {
                      m.current += 1;
                      setUpdate(!update);
                      if (start) setStart(false);
                    }}
                    className="bg-orange-400 text-white rounded-full px-2 w-16 h-16"
                  >
                    +1分
                  </button>
                  <button
                    onClick={() => {
                      s.current += 10;
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
                    onClick={() => setStart(!start)}
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

      {inUse ? (
        <div
          onClick={() => setTimerModalOpen(true)}
          className="text-3xl w-36 fixed bottom-24 timer:bottom-16 bg-orange-100 text-black text-center rounded-full p-1 ml-2 shadow-lg"
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
