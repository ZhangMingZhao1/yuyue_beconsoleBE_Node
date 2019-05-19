const koa = require("koa");   //node框架
const path = require("path");  
const bodyParser = require("koa-bodyparser"); //表单解析中间件
const session = require("koa-session-minimal");   //处理数据库的中间件
const MysqlStore = require("koa-mysql-session");  //处理数据库的中间件
const router = require("koa-router");     //路由中间件
const config = require('./config/default.js');    //引入默认文件
const views = require("koa-views");   //模板呈现中间件
const koaStatic = require("koa-static");  //静态资源加载中间件
const staticCache = require('koa-static-cache')
const cors = require("koa2-cors");
const app = new koa();

//session存储配置，将session存储至数据库
// const sessionMysqlConfig = {
//     user: config.database.USERNAME,
//     password: config.database.PASSWORD,
//     database: config.database.DATABASE,
//     host: config.database.HOST,
// }

//配置跨域中间件
app.use(cors({
    origin: function(ctx) {
      if (ctx.url === '/test') {
        return false;
      }
      return 'http://localhost:3006';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));


//配置session中间件
// app.use(session({
//     key: 'USER_SID',
//     store: new MysqlStore(sessionMysqlConfig)
// }))

//配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './public')
))

// //配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname, './views'),{
//     extension: 'ejs'
// }))

//使用表单解析中间件
app.use(bodyParser({
    "formLimit":"5mb",
    "jsonLimit":"5mb",
    "textLimit":"5mb"
}));

// 全局拦截
// function localFilter(ctx) {
//   let session = ctx.params.session;
//   if (getKey(session)) {
//       console.log("存在session");
//   }else {
//           console.log(ctx.request.url)
//           ctx.redirect('/login')
//       }
//   }

// app.use(async (ctx, next) => {
//   localFilter(ctx)
//   await next()
// })

//使用新建的路由文件
// app.use(require('./routers/login.js').routes())
app.use(require('./routers/memberM.js').routes())
app.use(require('./routers/franrank.js').routes())

//监听在8080端口
app.listen(8080) 

console.log(`listening on port ${config.port}`)