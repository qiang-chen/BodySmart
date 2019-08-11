//个人档案管理页面相关路由

//引入封装好MySQL函数文件
const {
    mysql
} = require("../utils/mysql.js")

//获取员工信息和个人基本信息
module.exports.getStaffInfo = (async ctx => {
    const $sql = `select * from staff`;
    const $sqlTime = `select * from essentialinfo`;
    let data = [];
    let time = []
    try {
        data = await mysql($sql);
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error
        }
        return;
    }
    try {
        time = await mysql($sqlTime);
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error
        }
        return;
    }
    let infoArr = data.map(item => {
        for (let i = 0; i < time.length; i++) {
            if (item.uid === time[i].tid) {
                item.essentialinfo = time[i];
                return item;
            }
        }
    })
    if (infoArr.length) {
        ctx.body = {
            code: 1,
            msg: infoArr
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "暂无数据"
        }
    }

})

//删除用户的接口
module.exports.removeStaffInfo = (async ctx => {
    console.log(ctx.query.uid);
    if (ctx.query.uid) {
        const $sql = `delete from staff where uid='${ctx.query.uid}'`;
        const $sqlTime = `delete from timemoney where tid='${ctx.query.uid}'`;
        const $sqlEssentialinfo = `delete from essentialinfo where tid='${ctx.query.uid}'`;
        const $sqlPeriod = `delete from period where tid='${ctx.query.uid}'`;
        let data = [];
        let time = [];
        let Essentialinfo=[];
        let Period=[]
        let successArr = []
        try {
            data = await mysql($sql);
            successArr.push(data)
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error
            }
            return;
        }
        try {
            time = await mysql($sqlTime);
            successArr.push(time)
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error
            }
            return;
        }
        try {
            Essentialinfo = await mysql($sqlEssentialinfo);
            successArr.push(Essentialinfo)
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error
            }
            return;
        }
        try {
            Period = await mysql($sqlPeriod);
            successArr.push(Period)
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error
            }
            return;
        }
        ctx.body = {
            code: 1,
            msg: successArr
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "该用户未找到"
        }
    }
})

//查询用户接口
module.exports.searchStaffInfo = (async ctx => {
    const info = ctx.query.info;
    const $sql = `select * from staff where username like '%${info}%' or uid like '%${info}%'`;
    let data = [];
    let time = [];
    let successArr = []
    try {
        data = await mysql($sql);
        for (let i = 0; i < data.length; i++) {
            let tid = data[i].uid;
            const $sqlTime = `select * from essentialinfo where tid like '%${tid}%'`;
            try {
                time = await mysql($sqlTime);
                data[i].essentialinfo = time[0];
                successArr.push(data[i])
            } catch (error) {
                ctx.body = {
                    code: 0,
                    msg: error
                }
                return;
            }
        }
        ctx.body = {
            code: 1,
            msg: successArr
        }
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error
        }
    }
})