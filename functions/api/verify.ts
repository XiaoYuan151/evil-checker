import { verifyCaptcha } from "@sctg/turnstile-vue3";
import { PagesFunction } from "@cloudflare/workers-types";

interface Env {
  CLOUDFLARE_TURNSTILE_SECRET_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body: { token: string } = await request.json();
  const token = body.token;
  const secret = env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  const cloudflare = request.headers.get("CF-Connecting-IP") || "";
  const data = await verifyCaptcha(secret, token, cloudflare);
  if (data.success) {
    return new (Response as any)(
      JSON.stringify({ message: "Captcha verified successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } else {
    return new Response(JSON.stringify({ message: "Invalid captcha" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
