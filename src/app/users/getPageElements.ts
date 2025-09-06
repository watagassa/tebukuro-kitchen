import { PostgrestError } from "@supabase/supabase-js";
import { Recipe } from "../types";
import { supabase } from "../utils/supabase"
import { exchangeIDtoUUID } from "../utils/supabaseLogin";

export type pageElements = {
    user_id: string;        //ユーザーID
    profile: {              //プロフィール情報
        name: string;     //ユーザー名
        avatar_url: string; //アバター画像のURL
    };
    created_recipes: Recipe[];  //作成したレシピの配列
}

export const getMyPage = async()=>{
    const {data:{user},error:idError} = await supabase.auth.getUser();
    if(!user)throw idError
    const user_id:pageElements["user_id"] = user.id;

    try{
        const {data:profileData,error:profileError} = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", user_id)
            .single();
        if (profileError || !profileData) throw new Error("取得したプロフィール情報が空です");
        const profile:pageElements["profile"] = {
            name:profileData.name,
            avatar_url:profileData.avatar_url
        }
        const {data:recipesData,error:recipesError} = await supabase
            .from("recipes")
            .select("*")
            .eq("user_id", user_id);
        if(recipesError) throw recipesError;
        const created_recipes:pageElements["created_recipes"] = recipesData as Recipe[];

        return {user_id,profile,created_recipes} as pageElements;

    }catch(error){
        throw new Error(`マイページの取得に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
    }
}

export const getOtherUserPage = async (user_id :string)=>{
    const id = Number(user_id)
    const {data:profileData,error:profileError} = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
    throwProfileError(profileError)

    const user_UUID = await exchangeIDtoUUID(user_id);
    const {data:recipesData,error:recipesError}= await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", user_UUID);

    throwRecupeError(recipesError);

    return {
        user_id:user_id,
        profile:profileData,
        created_recipes:recipesData
    }as pageElements;
}

const throwProfileError = ( profileError: PostgrestError|any)=>{
    if(profileError){
    const catchError : any = new Error('マイページの取得に失敗しました')
        switch(profileError.code){
            case "PGRST116":
                catchError.status = 404;
                catchError.message = '指定されたユーザーは存在しません';
                catchError.info = profileError
                break;
            default:
                catchError.status = 500;
                catchError.message = `サーバーエラーが発生しました`;
                catchError.info = profileError;
                break;
            }
        throw catchError;
    }
}

const throwRecupeError = (recipeError:PostgrestError|null)=>{
    if(recipeError){
        const catchError:any = new Error('レシピの取得に失敗しました')
        switch(recipeError.code){
            case "PGRST116":
                catchError.status = 404;
                catchError.message = '指定されたユーザーのレシピは存在しません';
                catchError.info = recipeError;
                break;
            default:
                catchError.status = 500;
                catchError.message = `サーバーエラーが発生しました`;
                catchError.info = recipeError;
                break;
        }
        throw catchError
    }
}
