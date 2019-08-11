const connection=require("../config/mysql.config.js");

module.exports.mysql=(statement,option)=>{
    return new Promise((resolve,reject)=>{
        let callback=(error,resauts)=>{
            if(error){
                reject(error)
            }else{
                resolve(resauts)
            }
            
        }
        option=option?option:callback;
        callback=option?callback:null;
        connection.query(statement,option,callback)
    })
}