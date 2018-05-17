const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()
const cors = require('@koa/cors')
const Sequelize = require('sequelize')
const config = require('./config')

// Receive the data from frontEnd

const main = async function (ctx, next) {

  const body = ctx.request.body;

  ctx.body = {
    contact: body.name,
    text: body.text
  };

  ctx.body = "Upload information Success!" // ctx.request.body.fields

  /******   Database insert function       ******/

  // Init the Database

  const sequelize = new Sequelize('mysql://root:123456@localhost:3306/ttfish');

  await sequelize.authenticate()

  console.log('Connection has been established successfully.')

  // Operate DataBase

  let textData = sequelize.define('textData', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    Contact: {
      type: Sequelize.STRING(30),
    },
    Textarea: {
      type: Sequelize.TEXT
    }
  }, {
    timestamps: false
  })

  let fish = JSON.parse(body)
  console.log(fish.text)

  let res = await textData.create({
    Contact: fish.contact,
    Textarea: fish.text,
  })

  console.log(JSON.stringify(res))

  await next();

};

app.use(koaBody({
  multipart: true
}));

app.use(cors())
app.use(main);
app.listen(config.dataPort);

console.log("Server Receiving Data")