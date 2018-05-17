const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()
const cors = require('@koa/cors')
const Sequelize = require('sequelize')
const config = require('./config')

const username = config.username
const passwd = config.password
const url = config.host
const port = config.dataBasePort
const table = config.database

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

  const sequelize = new Sequelize(`mysql://${username}:${passwd}@${url}:${port}/${table}`);

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