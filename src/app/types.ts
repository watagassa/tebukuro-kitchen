// export interface Todo {
//     id: number;
//     title: string;
//   }
// レシピ
export type Recipe = {
  id: number;
  name: string;
  image_url?: string;
  time?: string; //料理時間
  comment?: string;
  howmany?: string; //何人前
};
// 材料
export type Ingredient = {
  id: number;
  // index?:number;
  recipe_id: number;
  name: string;
  amount: string;
};
// 作り方説明
export type Descript = {
  id: number;
  // index?:number;
  recipe_id: number;
  image_url?: string;
  text?: string;
};

export type DetailRecipe = {
  id: number;
  name: string;
  image_url?: string;
  time?: string; //料理時間
  comment?: string;
  howmany?: string; //何人前
  Descripts: Descript[];
  Ingredients: Ingredient[];
};

// 入力フォーム用

export type inputDescript = {
  image: string | undefined;
  text: string | undefined;
  imageFile?: File;
};

export type InputIngredient = {
  name: string;
  amount: string;
};
