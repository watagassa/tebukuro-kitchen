"use server"
const youtube = async (keyword: string) => {
  const apiKey = process.env.YOUTUBE_API_KEY;

  // 今のYoutubeはほとんどがユーザ名なので、チャンネルページへのリクエストを送って取得する
  const channelId = "UCNfcdefRTSfKsKUTlU-dMGg";
  // ABC Cooking Studio
  // https://www.youtube.com/channel/UCNfcdefRTSfKsKUTlU-dMGg
  // キッコーマンより切り方等の動画数が多かったのでこっちにした

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&q=${keyword}&type=video&maxResults=1&key=${apiKey}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch YouTube video");
  }

  const data = await response.json();
  return data.items[0];
};

export default youtube;