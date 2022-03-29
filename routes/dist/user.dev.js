"use strict";

var express = require("express"); // 引入express模块


var route = express();

var con = require("./database"); //获取用户已解锁的模式


route.get('/mode/list', function (req, res) {
  // var sql = 'select * from user_mode where userId = ?';
  var sql = "\n    SELECT * FROM (\n        select * from user_mode where userId = ?\n    ) as a right join mode on a.modeId = mode.id";
  var params = [req.query.userId];
  con.query(sql, params, function (err, result) {
    try {
      res.send(result); //查询结果响应给请求方
    } catch (err) {
      console.log("查询失败");
    }
  });
}); //增加数据

route.post('/mode/unlock', function (req, res) {
  var sql = 'insert into user_mode set  userId=? , modeId=?'; // 这边的"?"是SQL的模板语法

  var params = [req.query.userId, req.query.modeId]; // 这边的数组参数与上边的"?"一一映射

  con.query(sql, params, function (err, result) {
    try {
      res.send('增加数据成功');
    } catch (err) {
      console.log('新增数据失败');
    }
  });
}); //获取用户信息

route.get('/info', function (req, res) {
  var sql = 'select * from user where id = ?';
  var params = [req.query.userId];
  con.query(sql, params, function (err, result) {
    try {
      res.send(result); //查询结果响应给请求方
    } catch (err) {
      console.log("查询失败");
    }
  });
}); //修改用户当前关卡进度

route.put('/over', function (req, res) {
  var sql = 'update user set chapterId=?, checkpoint =? where id=?';
  var params = [req.query.chapterId, req.query.checkpoint, req.query.userId];
  con.query(sql, params, function (err) {
    try {
      res.send({
        chapterId: req.query.chapterId,
        checkpoint: req.query.checkpoint
      });
    } catch (err) {
      console.log('修改数据失败');
    }
  });
}); //增加用户积分

route.post('/addPoint', function (req, res) {
  var sql = "\n    update user set point=? where id=?\n    ";
  var params = [req.query.point, req.query.userId];
  con.query(sql, params, function (err, result) {
    try {
      res.send(result); //查询结果响应给请求方
    } catch (err) {
      console.log("err", err);
    }
  });
}); //增加数据

route.post('/add', function (req, res) {
  var newTime = 'player' + String(Date.now());
  var sql = 'insert into user set  name=?,chapterId=?,checkpoint=?,point=?'; // 这边的"?"是SQL的模板语法

  var params = [newTime, 1, 1, 0]; // 这边的数组参数与上边的"?"一一映射

  con.query(sql, params, function (err, result) {
    try {
      // res.send('增加新用户成功');
      var sql2 = 'select * from user where name = ?';
      con.query(sql2, params, function (err, result) {
        try {
          res.send(result); //查询结果响应给请求方
        } catch (err) {
          console.log("查询失败");
        }
      });
    } catch (err) {
      console.log('新增新用户失败');
    }
  });
}); //获取所有用户

route.get('/allUsers', function (req, res) {
  var sql = 'select * from user';
  var params = [];
  con.query(sql, params, function (err, result) {
    try {
      res.send(result); //查询结果响应给请求方
    } catch (err) {
      console.log("查询失败");
    }
  });
}); //修改用户名

route.put('/changeInfo', function (req, res) {
  var sql = "\n    update user set name=? where id=?\n    ";
  var params = [req.query.name, req.query.userId];
  con.query(sql, params, function (err, result) {
    try {
      res.send('success'); //查询结果响应给请求方
    } catch (err) {
      console.log("err", err);
    }
  });
});
route.put('/updateAdmin', function (req, res) {
  var name = req.query.name || '';
  var point = req.query.point || '';
  var chapterId = req.query.chapterId || null;
  var checkpoint = req.query.checkpoint || null;
  var id = req.query.id;
  var sql = 'update user set `name`=?, `point`=?, `chapterId`=?,`checkpoint`=? where id=?';
  var params = [name, point, chapterId, checkpoint, id];
  con.query(sql, params, function (err, result) {
    try {
      res.send('success'); //查询结果响应给请求方
    } catch (err) {
      console.log("err", err);
    }
  });
}); //删除数据

route["delete"]('/delete', function (req, res) {
  var sql = 'delete from user where id= ?';
  var params = [req.query.userId];
  con.query(sql, params, function (err) {
    try {
      res.send('删除数据成功');
    } catch (err) {
      console.log('删除数据失败');
    }
  });
});
module.exports = route;