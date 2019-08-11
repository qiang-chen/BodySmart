//主要出口文件
const Koa=require("koa");
//引入处理post请求的中间件
const koabodyParser=require("koa-bodyparser")
//引入路由总出口文件
const router=require("../routers/index.js")

//创建实例app
const app=new Koa();

//挂载处理post请求的中间件
app.use(koabodyParser());

//挂载路由接口
app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('this is port 3000')
})