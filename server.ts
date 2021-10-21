import {
  Application,
  Context,
  Middleware,
} from "https://deno.land/x/oak@v9.0.1/mod.ts";

interface MyState {
  userId?: number;
}

const app = new Application();

const userIdMiddleware: Middleware<MyState, Context<MyState, {}>> = async (
  ctx,
  next,
) => {
  const userId = 1000;
  ctx.state.userId = userId;
  await next();
};

app.use(userIdMiddleware).use(async (ctx, next) => {
  ctx.state.userId;
  ctx.response.body = "Hello world!";
  await next();
});

await app.listen("127.0.0.1:8000");
