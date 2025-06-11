import { SWRConfig } from 'swr';
import HomeForm from './HomeForm';
import { homeGetRecipes } from '../utils/supabase/recipe';

export default async function StartHome(materialKey: { materialKey: string }) {
    const key = `${materialKey}--0`;
    const fallbackData = await homeGetRecipes(key);

    if (!fallbackData) { return <div>データが取得できませんでした</div>; }
    const fallback = { [key]: fallbackData, };

    return (
        <SWRConfig value={{ fallback }}>
            <HomeForm />
        </SWRConfig>
    );
}
