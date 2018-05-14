const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('fs');
const koaBody = require('koa-body');
const cors = require('@koa/cors')

const app = new Koa();
let fish = 0

const main = async function(ctx) {

  const tmpdir = './image'
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];

    fish = fish + 1

    let tail = file.name.substr(-4)
    let imageName = `${fish}${tail}`

    const filePath = path.join(tmpdir, imageName);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
    console.log(`Upload image ${file.name} as ${imageName} OK`)
    console.log(filePaths)
  }
  ctx.body = filePaths;
  console.log(ctx.response)
};

app.use(koaBody({ multipart: true }));
app.use(cors())
app.use(main);
console.log("Start server")
app.listen(3030);