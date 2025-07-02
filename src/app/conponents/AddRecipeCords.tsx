import React, { useContext } from "react";
import { Recipe } from "../types";
import ArticleCard from "./ArticleCard";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import LoadingComponent from "./LoadingDataFetch";
import { kWContext } from "../home/HomeForm";

type propsType = {
  materialKey: string; //表示管理用　一意のキーを指定する
  fetcher: (key: string) => Promise<Recipe[]>; //データ取得用のfetcher関数
  kw?: string; //検索キーワード
  pageSize: number; //1ページあたりのデータ数
};

const AddRecipeCords = ({ materialKey, fetcher, pageSize }: propsType) => {
  const searchKW = useContext(kWContext).searchKW;
  const getKey = (pageIndex: number, previousPageData: Recipe[][] | null) => {
    const key = `${materialKey}-${searchKW}-${pageIndex}`;
    if (previousPageData && previousPageData.length < pageSize) return null;
    return key;
  };

  const { data, error, isValidating, size, setSize } = useSWRInfinite<Recipe[]>(
    getKey,
    fetcher,
    {
      revalidateIfStale: false, // キャッシュがあっても再検証しない
      revalidateOnFocus: false, // windowをフォーカスすると再検証しない
      revalidateOnMount: false, // マウント時に再検証しない
      revalidateFirstPage: false, // 2ページ目以降を読み込むとき毎回1ページ目を再検証しない
    },
  );

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data?.[data?.length - 1]?.length < pageSize);

  // 画面下の要素にrefを渡し、refが画面に表示されたらisScrollEndがtrueになる
  const { ref, inView: isScrollEnd } = useInView();
  if (isScrollEnd && !isValidating && !isReachingEnd) {
    setSize(size + 1);
  }

  if (error) {
    console.error(error);
    return <div>error</div>;
  }

  return (
    <div className="flex-1">
      <div
        className={`grid flex-grow auto-rows-min grid-cols-2 gap-5 border-none bg-[#FFFBF4] p-5 sm:grid-cols-3 lg:grid-cols-4`}
      >
        {data?.flat().map((recipe: Recipe, index) => (
          <div key={index}>
            <ArticleCard recipe={recipe} />
          </div>
        ))}
      </div>

      {/* データ取得時は検知の要素を表示しない */}
      {!isValidating && <div ref={ref} aria-hidden="true" />}
      {/* データ取得時はローダーを表示する */}
      {isValidating && <LoadingComponent />}
    </div>
  );
};

export default AddRecipeCords;
