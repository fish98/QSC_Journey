const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const cors = require('@koa/cors')
const config = require('./config')

const app = new Koa();

const main = async function (ctx) {

  const tmpdir = config.imgDir
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];

    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
    console.log(`Upload image ${file.name} OK`)
  }
  ctx.body = filePaths;
};

app.use(koaBody({
  multipart: true
}));
app.use(cors())
app.use(main);
console.log("Start Receiving Images")
app.listen(config.imagePort);