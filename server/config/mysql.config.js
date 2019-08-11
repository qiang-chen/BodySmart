//MySQL的配置文件
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bodysmart'
});

connection.connect(function(err) {
    if (err) {
      console.error('数据库连接失败 ' + err.stack);
      return;
    }
  
    console.log('数据库连接成功' + connection.threadId);
  });

module.exports=connection;