// app/api/users/[recipe_id]/check.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(
  req: Request,
  { params }: { params: { recipe_id: string } },
) {
  const token = req.headers
    .get("cookie")
    ?.match(/sb-[^-]+-auth-token(?:\.\d+)?=([^;]+)/)?.[1];

  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  console.log("User in check.ts:", user);

  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data: recipe } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", Number(params.recipe_id))
    .single();

  if (!recipe || recipe.user_id !== user.id)
    return new Response("Forbidden", { status: 403 });

  return new Response(JSON.stringify({ ok: true }));
}
