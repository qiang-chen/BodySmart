//代课费页面管理相关接口逻辑文件

//引入封装好MySQL函数文件
const {
    mysql
} = require("../utils/mysql.js")

//增加用户接口
module.exports.adduser = (async ctx => {
    //console.log(ctx.request.body);
    let {
        username,//员工姓名
        department,//员工部门
        position,//员工职位
        grade,//员工班级
        kindergarten,//员工学院
        classHour,//员工上课课时  type：number
        classMoney,//员工上课费用 type：number
        entryTimes,//入职时间,
        entryRemark,//入职备注
        dimissionTime,//离职时间
        dimissionRemark,//离职备注
        dimissionCause,//离职原因
        Birthdate,//出生日期
        identitys,//身份证号
        residence,//居住地
        education,//学历
        nation,//民族
        face,//政治面貌
        marriage,//婚姻状况
        mobile,//手机号
    } = ctx.request.body
    let tid = new Date().getTime() + "";
    let TotalMoney=classHour*classMoney;//代课总价钱
    let userArr = [tid, username, department, position];
    const $save = `insert into staff(uid,username,department,position) values(?,?,?,?);`;
    //顺带给timemoney存进去一个身份信息也就是时间戳生成的id

    const $saveTime = `insert into timemoney(username,tid,classHour,classMoney,TotalMoney) values(?,?,?,?,?);`;
    const timeArr = [username,tid,classHour,classMoney,TotalMoney];

    //基本信息表格存入
    const $saveeSsentialInfo=`insert into essentialinfo(tid,username,identitys,residence,education,nation,face,marriage,mobile,Birthdate) values(?,?,?,?,?,?,?,?,?,?);`;
    const ssentialInfoArr=[tid,username,identitys,residence,education,nation,face,marriage,mobile,Birthdate]

    //离职在职表存入
    const $savePeriod=`insert into period(tid,username,entryTimes,dimissionTime,entryRemark,dimissionRemark,dimissionCause,grade,kindergarten) values(?,?,?,?,?,?,?,?,?);`;
    const periodArr=[tid,username,entryTimes,dimissionTime,entryRemark,dimissionRemark,dimissionCause,grade,kindergarten]

    let sucessArr = []; //储存成功结果的数组
    let errorArr = []; //储存失败结果的数组
    try {
        let data = await mysql($save, userArr);
        sucessArr.push(data)
    } catch (error) {
        errorArr.push(error)
    }
    try {
        let timeData = await mysql($saveTime, timeArr);
        sucessArr.push(timeData)
    } catch (error) {
        errorArr.push(error)
        //console.log(error, "失败的信息");
    }
    try {
        let ssentialInfoData = await mysql($saveeSsentialInfo, ssentialInfoArr);
        sucessArr.push(ssentialInfoData)
    } catch (error) {
        errorArr.push(error)
        //console.log(error, "失败的信息");
    }
    try {
        let periodData = await mysql($savePeriod, periodArr);
        sucessArr.push(periodData)
    } catch (error) {
        errorArr.push(error)
    }
    if (errorArr.length) {
        ctx.body = {
            code: 0,
            msg: errorArr
        }
    } else {
        ctx.body = {
            code: 1,
            msg: sucessArr
        }
    }
})


//获取员工信息和代课费信息
module.exports.getStaffInfo = (async ctx => {
    const $sql = `select * from staff`;
    const $sqlTime = `select * from timemoney`;
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
    console.log(data,time);
    let infoArr = data.map(item => {
        for (let i = 0; i < time.length; i++) {
            if (item.uid === time[i].tid) {
                item.time = time[i];
                return item;
            }
        }
    })
    console.log(infoArr);
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
            const $sqlTime = `select * from timemoney where tid like '%${tid}%'`;
            try {
                time = await mysql($sqlTime);
                data[i].time = time[0];
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