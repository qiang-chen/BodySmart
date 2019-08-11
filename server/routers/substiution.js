const router = require('koa-router')();
//写代课费管理页面相关的路由
const {adduser,getStaffInfo,removeStaffInfo,searchStaffInfo}=require("../controller/substiution.js")
//console.log(adduser,getStaffInfo);
//增加员工接口
router.post("/adduser",adduser);

//获取员工信息接口
router.get("/getStaffInfo",getStaffInfo)

//删除员工信息的接口
router.delete("/removeStaffInfo",removeStaffInfo)

//模糊搜索接口
router.get("/searchStaffInfo",searchStaffInfo)

module.exports=router;