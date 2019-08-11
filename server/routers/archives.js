//档案管理页面相关接口
const router=require("koa-router")();
const {getStaffInfo,searchStaffInfo,removeStaffInfo}=require("../controller/archives.js")


//获取员工信息接口
router.get("/getStaffInfo",getStaffInfo)

//删除员工信息的接口
router.delete("/removeStaffInfo",removeStaffInfo)

//模糊搜索接口
router.get("/searchStaffInfo",searchStaffInfo)


module.exports=router;