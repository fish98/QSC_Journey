const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()
const cors = require('@koa/cors')
const config = require('./config')

//const list = []

// Operate the Database

async function OperateDataBase () {

  const sequelize = new Sequelize(`mysql://${config.username}:${config.password}@${config.host}:${config.dataBasePort}/${database}`);
  
  let textData = sequelize.define('textData', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey:  true
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
  }


// Receive the data from frontEnd

const main = async function(ctx, next) {
  const body = ctx.request.body;

  ctx.body = { 
    contact: body.name,
    text: body.text
   };
  //list.push(body)
 //  console.log(ctx.request.body.fields)
  ctx.body = "Upload information Success!"// ctx.request.body.fields
  await OperateDataBase()

  //console.log(list)
  await next();
};

app.use(koaBody({
  multipart: true
}));
app.use(cors())
app.use(main);
app.listen(config.port);

console.log("Server Receiving Data")
