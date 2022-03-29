const express = require("express");　　// 引入express模块
const route = express();
// const mysql = require('mysql'); // 引入mysql模块
const con = require("./database");
// const moment = require("moment");

/**
 * 成就系统
 */

//获取用户成就列表,包括未完成的成就
route.get('/list', function(req, res) {
  var sql = `
  SELECT * FROM (
      select * from user_achieve where userId = ?
  ) as a right join achieve on a.achieveId = achieve.id`;
  var params = [req.query.userId]
  con.query(sql, params, function(err, result) { 
      try {
          res.send(result) //查询结果响应给请求方

      } catch (err) {
          console.log("查询失败");
      }
  });
})
route.get('/listAll', function(req, res) {
    var sql = `select * from achieve`;
    var params = []
    con.query(sql, params, function(err, result) { 
        try {
            res.send(result) //查询结果响应给请求方
  
        } catch (err) {
            console.log("查询失败");
        }
    });
  })
  

/**
 * 添加用户成就
 */


route.post('/add', function(req, res) {
  var sql = 'insert into user_achieve set  userId=? , achieveId=?'; 
  var params = [req.query.userId, req.query.achieveId]  
  con.query(sql, params, function(err, result) {
      try {
          res.send('增加数据成功');
      } catch (err) {
          console.log('新增数据失败');
      }
  });
})

route.post('/addAchieve', function(req, res) {
    const feature = JSON.stringify(req.query.feature)
    var sql = 'insert into achieve (`name`, `desc`,`number`,`modeId`,`feature` ) VALUES (?, ?,?,?,?)'; 
    // var sql = 'insert into achieve set  name=? , desc=?,number=?, modeId=?, feature=?'; 
    // var params = [req.query.name, req.query.desc]  
    var params = [req.query.name, req.query.desc,req.query.number,req.query.modeId,feature]  
    con.query(sql, params, function(err, result) {
        try {
            res.send('增加数据成功');
        } catch (err) {
            console.log('新增数据失败');
        }
    });
  })


//修改成就配置
route.put('/update', function(req, res) {
    const feature = JSON.stringify(req.query.feature||null)
    const name=req.query.name || '';
    const desc=req.query.desc || '';
    const number=req.query.number || null;
    const modeId=req.query.modeId || null;
    const id=req.query.id;
    var sql = 'update achieve set `name`=?, `desc`=?, `number`=?,`modeId`=?,`feature`=? where id=?';
    var params = [name, desc,number,modeId,feature, id]  
    // var sql = 'update achieve set name=?, `desc`=? where id=?';
    // var params = [name, desc, id]  
    con.query(sql, params, function(err) {
        try {
            res.send('修改数据成功');
        } catch (err) {
            console.log('修改数据失败');
        }
    });
})
//删除数据
route.delete('/delete', function(req, res) {
    var sql = 'delete from achieve where id= ?'
    var params = [req.query.id];
    con.query(sql, params, function(err) {
        try {
            res.send('删除数据成功');
        } catch (err) {
            console.log('删除数据失败');
        }
    });
})


module.exports = route;
