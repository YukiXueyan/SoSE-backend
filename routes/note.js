const express = require("express");　　// 引入express模块
const route = express();
const con = require("./database");

// 添加错题记录
route.post('/add', function(req, res) {
  // const questionId = req.query.questionId;
  const questionId = JSON.parse(req.query.questionId);
  questionId.map(item => {
    var sql = 'insert into wrong_note set  userId=? , questionId=?'; // 这边的"?"是SQL的模板语法
    var params = [req.query.userId, item]  // 这边的数组参数与上边的"?"一一映射
    con.query(sql, params, function(err, result) {
        try {
            res.send('增加数据成功');
        } catch (err) {
            console.log('新增数据失败');
        }
    });
  })

})


// 删除错题记录
route.delete('/delete', function(req, res) {
  var sql = 'delete from wrong_note where noteId= ?'
  // var sql = 'delete from wrong_note where questionId= ?and userId=?'
  var params = [req.query.noteId]
  // var params = [req.query.questionId, req.query.userId]

  con.query(sql, params, function(err) {
      try {
          res.send('删除数据成功');
      } catch (err) {
          console.log('删除数据失败');
      }
  });
})


//收藏   标识符：questionId，isStar=1
route.put('/fork', function(req, res) {
  var sql = 'update wrong_note set isStar=? where noteId=?';
  var params = [1, req.query.noteId];
  // var sql = 'update wrong_note set isStar=?, where questionId=? and userId=?';
  // var params = [1, req.query.questionId, req.query.userId]
  con.query(sql, params, function(err) {
      try {
          res.send('收藏成功');
      } catch (err) {
          console.log('收藏失败');
      }
  });
})

//取消收藏
route.put('/unfork', function(req, res) {
  var sql = 'update wrong_note set isStar=? where noteId=?';
  var params = [0, req.query.noteId];
  // var sql = 'update wrong_note set isStar=?, where questionId=? and userId=?';
  // var params = [1, req.query.questionId, req.query.userId]
  con.query(sql, params, function(err) {
      try {
          res.send('收藏成功');
      } catch (err) {
          console.log('收藏失败');
      }
  });
})
//解锁答案（积分-，unlock=1  标识符：questionId
route.put('/unlock', function(req, res) {
  var sql = 'update wrong_note set `unlock`=? where noteId=?';
  // const unlock='1';
  // var sql = 'update wrong_note set unlock=?, where (questionId=? and userId=?)';
  var params = [1, req.query.noteId]
  // var params = [1, req.query.questionId, req.query.userId]
  con.query(sql, params, function(err) {
      try {
          res.send('修改数据成功');
      } catch (err) {
          console.log('修改数据失败');
      }
  });
})

//显示用户的错题 noteXqustion
route.get('/select', function(req, res) {
//   var sql = `
//   SELECT * FROM wrong_note as a join question where userId=? and a.questionId = question.id;
//   `; //sql查询语句：查找wrong_note表中所有数据
  var sql = `
  SELECT * FROM (
    select * from wrong_note
) as a left join question on question.id = a.questionId where userId = ?;
  `
  var params = [ req.query.userId]
  con.query(sql,params, function(err, result) { //连接数据库 传入sql语句 回调函数得到结果
      try {
          res.send(result) //查询结果响应给请求方

      } catch (err) {
          console.log("查询失败");
      }
  });
})


module.exports = route;