import React from 'react'
import { Recipe } from '../types';
import ArticleCard from './ArticleCard';
import useSWRInfinite from 'swr/infinite';
import { useInView } from 'react-intersection-observer'
import LoadingComponent from './LoadingDataFetch';

type propsType = {
    materialKey: string;                            //表示管理用　一意のキーを指定する
    fetcher: (key: string) => Promise<Recipe[]>;    //データ取得用のfetcher関数
    kw?: string;                                    //検索キーワード
    pageSize: number;                               //1ページあたりのデータ数
}

const AddRecipeCords = ({ materialKey, fetcher, kw, pageSize }: propsType) => {

    const getKey = (pageIndex: number, previousPageData: Recipe[][] | null) => {
        if (previousPageData && previousPageData.length < pageSize) return null;
        return `${kw}-${materialKey}-${pageIndex}`;
    }
    const { data, error, isValidating, size, setSize } = useSWRInfinite<Recipe[]>(getKey, fetcher,
        {
            revalidateIfStale: false, // キャッシュがあっても再検証しない
            revalidateOnFocus: false, // windowをフォーカスすると再検証しない
            revalidateFirstPage: false, // 2ページ目以降を読み込むとき毎回1ページ目を再検証しない
        },
    );
    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd = isEmpty || (data && data?.[data?.length - 1]?.length < pageSize)

    // 画面下の要素にrefを渡し、refが画面に表示されたらisScrollEndがtrueになる
    const { ref, inView: isScrollEnd } = useInView()
    if (isScrollEnd && !isValidating && !isReachingEnd) {
        setSize(size + 1)
    }

    if (error) { console.error(error); return <div>error</div> };

    return (
        <div className="flex-1">
            <div className={`bg-[#FFFBF4] border-none flex-grow grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-min gap-5 p-5`}>{
                data?.flat().map((recipe: Recipe | any, index) => (
                    <div key={index}>
                        <ArticleCard recipe={recipe} />
                    </div>))}
            </div>
            {/* データ取得時は検知の要素を表示しない */}
            {!isValidating && <div ref={ref} aria-hidden='true' />}
            {/* データ取得時はローダーを表示する */}
            {isValidating && <LoadingComponent />}
        </div>
    )
}

export default AddRecipeCords