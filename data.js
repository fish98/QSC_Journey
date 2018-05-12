const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const cors = require('@koa/cors')

const list = []

const main = async function(ctx, next) {
  const body = ctx.request.body;
  // ctx.body = { name: body.name };
  list.push(body)
 //  console.log(ctx.request.body.fields)
  ctx.body = "Upload information Success!"// ctx.request.body.fields
  console.log(list)
  await next();
};

app.use(koaBody({
  multipart: true
}));
app.use(cors())
app.use(main);
app.listen(3030);

console.log("Server Start")
