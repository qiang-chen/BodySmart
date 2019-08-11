# 接口文档

## 代课费页面相关接口

### 增加用户接口
#### 接口地址 
~~~ js
    http://localhost:3000/substiution/adduser
~~~
#### 请求方式
    post
#### 参数
    {
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
    }
#### 返回值

~~~ js
    //失败的时候
    {
         code: 0,
         msg: errorArr,//储存失败信息的数组
    }
    //成功的时候
    {
        code: 1,
        msg: sucessArr//储存成功信息的数组
    }
~~~
--------------------

### 获取代课费接口
#### 接口地址 
~~~ js
    http://localhost:3000/substiution/getStaffInfo
~~~
#### 请求方式
    get
#### 参数
    无
#### 返回值

~~~ js
    //失败的时候
    {
        code: 0,
        msg: error,//失败信息
    }
    //成功的时候
    {
        code: 1,
        msg: infoArr,//返回查询到的数组
    }
    //或者
    {
        code: 2,
        msg: "暂无数据"
    }
~~~

--------------------
### 删除用户接口
#### 接口地址 
~~~ js
    http://localhost:3000/substiution/removeStaffInfo
~~~
#### 请求方式
    delete
#### 参数
    uid 用户的身份令牌
#### 返回值

~~~ js
    //失败的时候
    {
        code: 0,
        msg: error,//失败信息
    }
    //或者
    {
        code: 0,
        msg: "该用户未找到"
     }
    //成功的时候
    {
        code: 1,
        msg:successArr//成功信息组成的数组
    }
    
~~~
--------------------
### 查询接口
#### 接口地址 
~~~ js
    http://localhost:3000/substiution/searchStaffInfo
~~~
#### 请求方式
    get
#### 参数
    info 用户的身份令牌或者用户名
#### 返回值

~~~ js
    //失败的时候
    {
        code: 0,
        msg: error,//失败信息
    }
    //成功的时候
    {
        code: 1,
        msg:successArr//查询到的符合条件的用户
    }
~~~
--------------------

## 个人档案页面相关接口

### 获取个人档案接口
#### 接口地址 
~~~ js
    http://localhost:3000/archives/getStaffInfo
~~~
#### 请求方式
    get
#### 参数
    无
#### 返回值

~~~ js
    //失败的时候
    {
        code: 0,
        msg: error,//失败信息
    }
    //成功的时候
    {
        code: 1,
        msg: infoArr,//返回查询到的数组
    }
    //或者
    {
        code: 2,
        msg: "暂无数据"
    }
~~~

--------------------

### 删除用户接口
#### 接口地址 
~~~ js
    http://localhost:3000/archives/removeStaffInfo
~~~
#### 请求方式
    delete
#### 参数
    uid 用户的身份令牌
#### 返回值

~~~ js
    //失败的时候
    {
        code: 0,
        msg: error,//失败信息
    }
    //或者
    {
        code: 0,
        msg: "该用户未找到"
     }
    //成功的时候
    {
        code: 1,
        msg:successArr//成功信息组成的数组
    }
    
~~~
--------------------

### 查询接口
#### 接口地址 
~~~ js
    http://localhost:3000/archives/searchStaffInfo
~~~
#### 请求方式
    get
#### 参数
    info 用户的身份令牌或者用户名
#### 返回值

~~~ js
    //失败的时候
    {
        code: 0,
        msg: error,//失败信息
    }
    //成功的时候
    {
        code: 1,
        msg:successArr//查询到的符合条件的用户
    }
~~~
--------------------