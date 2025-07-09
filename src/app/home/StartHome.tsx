import { SWRConfig } from "swr";
import HomeForm from "./HomeForm";
import { randomFetcher } from "../utils/supabase/recipe";

export default async function StartHome() {
  const key = `Recipe--0`;

  const fallbackData = await randomFetcher();

  if (!fallbackData) {
    return <div>データが取得できませんでした</div>;
  }

  const fallback = { [key]: fallbackData };

  return (
    <SWRConfig value={{ fallback }}>
      <HomeForm />
    </SWRConfig>
  );
}
