import { SWRConfig } from 'swr';
import HomeForm from './HomeForm';
import { Homefetcher_SWR } from '../utils/supabaseFunctionsNew';

export default async function StartHome(materialKey: { materialKey: string }) {
    const key = `${materialKey}--0`;

    const fallbackData = await Homefetcher_SWR(key);

    if (!fallbackData) { return <div>データが取得できませんでした</div>; }

    const fallback = { [key]: fallbackData, };

    return (
        <SWRConfig value={{ fallback }}>
            <HomeForm />
        </SWRConfig>
    );
}
