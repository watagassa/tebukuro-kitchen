import { SWRConfig } from "swr";
import HomeForm from "./HomeForm";
import { favoriteFetcher } from "../utils/supabase/recipe";

export default async function page() {
  const key = "favorites--0";
  const fallbackData = await favoriteFetcher();

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
