//路由总出口文件

const router=require("koa-router")();



//引入代课费管理页面相关接口
const substiution=require("./substiution.js");

//引入档案管理相关页面接口
const archives=require("./archives.js")

router.use("/substiution",substiution.routes(),substiution.allowedMethods())
router.use("/archives",archives.routes(),archives.allowedMethods())

module.exports=router;