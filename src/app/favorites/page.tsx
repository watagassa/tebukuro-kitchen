import { SWRConfig } from 'swr';
import HomeForm from './HomeForm';
import { favoritesFetcher, } from '../utils/supabaseFunctionsNew';

export default async function page() {
    const materialKey = "favorites";
    const key = `${materialKey}--0`;

    const fallbackData = await favoritesFetcher(key);

    if (!fallbackData) { return <div>データが取得できませんでした</div>; }

    const fallback = { [key]: fallbackData, };

    return (
        <SWRConfig value={{ fallback }}>
            <HomeForm />
        </SWRConfig>
    );
}
