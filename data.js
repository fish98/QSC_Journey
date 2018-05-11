
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const main = async function(ctx) {
  const body = ctx.request.body;
  ctx.body = { name: body.name };
  console.log(ctx.body)
};

app.use(koaBody());
app.use(main);
app.listen(3000);

console.log("ttfish")
