"use server";

// Google Cloud Text-to-Speech API を呼び出す
export const getVoice = async (text: string | undefined, speed: number) => {
  if (!text) return;
  const apiKey = process.env.YOUTUBE_API_KEY;
  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: "ja-JP", ssmlGender: "NEUTRAL" },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: speed,
          // ブラウザが勝手に音量を平均化しちゃうので音量調整出来ないかも
          volumeGainDb: 0.0,
        },
      }),
    },
  );
  const data = await res.json();
  return data;
};
