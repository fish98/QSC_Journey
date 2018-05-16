const Sequelize = require('sequelize')
const config = require('./config')

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   dialect: 'mysql',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 30000,
//   }
// })

const sequelize = new Sequelize('mysql://root:123456@localhost:3306/ttfish');

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


  // sequelize
  // .authenticate()
  // .then(() => {
  //   console.log('Connection has been established successfully.');
  // })
  // .catch(err => {
  //   console.error('Unable to connect to the database:', err);
  // });
textData.create({
  Contact: "hello world",
  Textarea: "My name is TTfish"
}).then((req) => {
  console.log(JSON.stringify(req))
})